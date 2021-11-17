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
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { DatePicker } from './DatePickerWrapper/DatePickerWrapper';
import { SignOf } from './SignOf';
import { useDisclosure } from '@chakra-ui/react';
import { SSL_OP_NO_COMPRESSION } from 'constants';

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
  const [save, { loading, data, error }] = useMutation(CREATE_SIGNOF);
  const [stunde, setStunde] = useState(0);
  const [vonBis, setVonBis] = useState({
    vonStunde: 0,
    vonMinute: 0,
    bisStunde: 0,
    bisMinute: 0,
  });

  const handleKunde = (e) => {
    setKunde(e.target.value);
  };

  const handleHours = (what) => (e) => {
    setVonBis({ ...vonBis, [what]: parseInt(e) });
  };

  const handleClear = () => {
    canvas.current.width = canvas.current.width;
    setKunde('');
    setDate(new Date());
    setVonBis({
      vonStunde: 0,
      vonMinute: 0,
      bisStunde: 0,
      bisMinute: 0,
    });
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
                    von:
                      String(vonBis.vonStunde) + ':' + String(vonBis.vonMinute),
                    bis:
                      String(vonBis.bisStunde) + ':' + String(vonBis.bisMinute),
                    stunden:
                      ((vonBis.bisStunde - vonBis.vonStunde) * 60 +
                        (vonBis.bisMinute - vonBis.vonMinute)) /
                      60,

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
          <FormLabel>Zeit</FormLabel>
          <Stack direction={'row'}>
            <NumberInput
              size='lg'
              maxW={24}
              min={0}
              max={24}
              onChange={handleHours('vonStunde')}
              value={vonBis.vonStunde}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <NumberInput
              size='lg'
              maxW={24}
              min={0}
              max={59}
              onChange={handleHours('vonMinute')}
              value={vonBis.vonMinute}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Text fontSize='3xl'>-</Text>

            <NumberInput
              size='lg'
              maxW={24}
              min={0}
              max={24}
              onChange={handleHours('bisStunde')}
              value={vonBis.bisStunde}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <NumberInput
              size='lg'
              maxW={24}
              min={0}
              max={59}
              onChange={handleHours('bisMinute')}
              value={vonBis.bisMinute}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
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
