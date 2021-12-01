import { gql, useMutation } from '@apollo/client';
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
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleKunde = (e) => {
    setKunde(e.target.value);
  };

  const handleClear = () => {
    canvas.current.width = canvas.current.width;
    setKunde('');
    setDate(new Date());
    setEndTime(null);
    setStartTime(null);
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
            console.log(
              date,
              kunde,
              new Date(startTime.getTime()).toString(),
              new Date(endTime.getTime()).toString(),
              (endTime.getTime() - startTime.getTime()) / 3600000
            );
            const dolo = async () =>
              await save({
                variables: {
                  createSignofInput: {
                    datum: date,
                    kunde: kunde,
                    von: new Date(startTime.getTime()).toString(),
                    bis: new Date(endTime.getTime()).toString(),
                    stunden:
                      (endTime.getTime() - startTime.getTime()) / 3600000,
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
            <Input
              name='kunde'
              type='text'
              autoComplete='datum'
              required
              onChange={handleKunde}
              value={kunde}
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
            <Box>
              <FormControl id='endZeit'>
                <FormLabel>Endzeit</FormLabel>
                <TimeSelector date={endTime} setDate={setEndTime} />
              </FormControl>
            </Box>
          </Flex>

          <SignOf canvasREF={canvas} />

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
