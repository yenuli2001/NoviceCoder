import React, { useState, useEffect } from 'react';
import { Box, Textarea } from '@chakra-ui/react';

const DebugConsole = ({ logs }) => {
  useEffect(() => {
    console.log('DebugConsole logs:', logs); // Ensure logs are received
  }, [logs]);

  return (
    <Box
      w="50%"
      height="50vh"
      border="2px solid"
      borderColor="purple.500"
      borderRadius="md"
      marginTop="86px"
      mt={4}
      p={2}
    >
      <Textarea
        value={logs.join('\n')}
        readOnly
        height="100%"
        resize="none"
        bg="purple.900"
        color="white"
      />
    </Box>
  );
};

export default DebugConsole;
