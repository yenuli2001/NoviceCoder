import React, { useState } from 'react';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { executeCode } from '../../api';
import model from '../../lib/gemini'; // Import the model
import Markdown from 'react-markdown';

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorExplanation, setErrorExplanation] = useState('');

  const explainError = async error => {
    try {
      console.log('Error to explain:', error);
      const prompt = `Explain the following error in simple terms with the corrected code:\n\n${error}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      console.log('API Response:', text); // debug

      setErrorExplanation(text);
    } catch (err) {
      console.error('Error explaining the error:', err);
    }
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      console.log('Execution result:', result); // debug
      setOutput(result.output.split('\n'));
      result.stderr ? setIsError(true) : setIsError(false);
      if (result.stderr) {
        console.log('Error detected:', result.stderr); // Debugging step
        explainError(result.stderr);
      }
    } catch (error) {
      console.log('Execution error:', error); // Debugging step
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to run code',
        status: 'error',
        duration: 6000,
      });
      explainError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      {!isError && (
        <Box
          height="75vh"
          p={2}
          color={isError ? 'red.400' : ''}
          border="5px solid"
          borderRadius="md"
          borderColor={isError ? 'red.500' : 'purple.200'}
          overflowY="auto"
        >
          {output
            ? output.map((line, i) => <Text key={i}>{line}</Text>)
            : 'Click "Run Code" to see the output here'}
        </Box>
      )}
      {isError && (
        <Box
          height="75vh"
          p={2}
          border="5px solid"
          borderRadius="md"
          borderColor="red.500"
          overflow="hidden"
          overflowY="auto"
        >
          <Text color="red.500">Error Explanation:</Text>
          <Text color="red.500">
            <Markdown>{errorExplanation}</Markdown>
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Output;
