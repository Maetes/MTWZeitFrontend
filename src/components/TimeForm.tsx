import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { DatePicker } from './DatePickerWrapper/DatePickerWrapper';
import { SignOf } from './SignOf';
import { useDisclosure } from '@chakra-ui/react';
import { TimeSelector } from './TimeSelector';
import { AsyncCreatableSelect } from 'chakra-react-select';
import { stringify } from 'querystring';

interface MUTTIME {
  createSignofInput: {
    datum: Date;
    bis: string;
    von: string;
    unterschrift: string;
    kunde: string;
    stunden: number;
  };
}

export const CREATE_SIGNOF = gql`
  mutation CreateSignof($createSignofInput: CreateSignofInput!) {
    createSignof(createSignofInput: $createSignofInput) {
      datum
      id
      kunde
      stunden
      unterschrift
      von
      bis
    }
  }
`;

export const GET_ALL_CUSTOMERS = gql`
  query SignofContain($kd: String!) {
    signofContain(kd: $kd) {
      kunde
    }
  }
`;

export const TimeForm = (props: HTMLChakraProps<'form'>) => {
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
    onToggle: onToggleError,
  } = useDisclosure();
  const [success, setSuccess] = useState(false);
  const canvas = useRef(null);
  const [kunde, setKunde] = useState('');
  const [date, setDate] = useState(new Date());
  const [save, { loading, data, error }] = useMutation<any, MUTTIME>(
    CREATE_SIGNOF
  );
  const { client } = useQuery(GET_ALL_CUSTOMERS);
  const [trueFalse, setTrueFalse] = useState(false);
  const [selectState, setSelectState] = useState('');

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const fetchCustomers = async (inputSelected: string) => {
    const res = await client.query({
      query: GET_ALL_CUSTOMERS,
      variables: { kd: inputSelected },
    });
    if (res.data && res.data.signofContain) {
      return res.data.signofContain.map((a) => ({
        label: a.kunde,
        value: a.kunde,
      }));
    }
    return [];
  };

  const handleClear = () => {
    canvas.current.width = canvas.current.width;
  };

  return (
    <>
      {error && !isOpenError && (
        <Alert status='error'>
          <AlertIcon />
          <Box flex='1'>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription display='block'>
              {error.message && error.message}
              {!error.message &&
                'Unterschrift konnte nicht gespeichert werden! Bitte versuchen Sie es später erneut!'}
            </AlertDescription>
          </Box>
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={onOpenError}
          />
        </Alert>
      )}
      {success && !error && (
        <Alert status='success'>
          <AlertIcon />
          <Box flex='1'>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription display='block'>
              Auftrag gespeichert. Vielen Dank für Ihr vertrauen
            </AlertDescription>
          </Box>
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={() => setSuccess(false)}
          />
        </Alert>
      )}

      <chakra.form
        onSubmit={(e) => {
          e.preventDefault();
          var dataUrl = canvas.current.toDataURL();
          try {
            const dolo = async () =>
              await save({
                variables: {
                  createSignofInput: {
                    datum: date,
                    kunde: kunde,
                    von: new Date(startTime.getTime()).toString(),
                    bis: new Date(endTime.getTime()).toString(),
                    stunden:
                      Math.round(
                        ((endTime.getTime() - startTime.getTime()) / 3600000 +
                          Number.EPSILON) *
                          100
                      ) / 100,
                    unterschrift: dataUrl,
                  },
                },
              });
            dolo();
            setSuccess(true);
            handleClear();
          } catch (error) {
            console.log(error.message);
          }
        }}
        {...props}
      >
        <Stack spaceing='6'>
          <FormControl id='datum'>
            <FormLabel>Datum</FormLabel>
            <DatePicker
              id='datum'
              showPopperArrow={true}
              selected={date}
              onChange={(date) => setDate(date as Date)}
            />
          </FormControl>

          <FormControl id='kunde'>
            <FormLabel>Kunde</FormLabel>
            <AsyncCreatableSelect
              cacheOption
              // defaultOptions
              name='kunde'
              loadOptions={fetchCustomers}
              placeholder='Kunde auswählen oder erstellen'
              closeMenuOnSelect={true}
              // onChange={(e) => fetchCustomers(e)}
            />
          </FormControl>
          <Flex direction={'row'} justifyContent={'space-between'}>
            <Box width={'15rem'}>
              <FormControl id='startTime'>
                <FormLabel>Startzeit</FormLabel>
                <TimeSelector date={startTime} setDate={setStartTime} />
              </FormControl>
            </Box>
            {/* <Spacer /> */}
            <Box width={'15rem'}>
              <FormControl id='endZeit'>
                <FormLabel>Endzeit</FormLabel>
                <TimeSelector date={endTime} setDate={setEndTime} />
              </FormControl>
            </Box>
          </Flex>

          <SignOf canvasREF={canvas} />
          {startTime && endTime && (
            <Text>
              {`Stunden: ` +
                Math.round(
                  ((endTime.getTime() - startTime.getTime()) / 3600000 +
                    Number.EPSILON) *
                    100
                ) /
                  100}
            </Text>
          )}
          <Button colorScheme='blue' type='submit'>
            Speichern {loading && <Spinner />}
          </Button>
          <Button colorScheme='blue' onClick={handleClear}>
            Löschen
          </Button>
        </Stack>
      </chakra.form>
    </>
  );
};
