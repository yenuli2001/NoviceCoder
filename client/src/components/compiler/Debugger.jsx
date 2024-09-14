import { useEffect } from 'react';
import * as monaco from 'monaco-editor';

const Debugger = ({ editor, setBreakpoints, setLogs }) => {
  useEffect(() => {
    if (editor) {
      const breakpoints = new Map();
      const logs = [];

      const addLog = message => {
        logs.push(message);
        setLogs([...logs]);
      };

      const addBreakpoint = () => {
        console.log('Add Breakpoint function triggered');
        const position = editor.getPosition();
        const model = editor.getModel();
        const id = model.deltaDecorations(
          [],
          [
            {
              range: new monaco.Range(
                position.lineNumber,
                1,
                position.lineNumber,
                1
              ),
              options: {
                isWholeLine: true,
                className: 'myContentClass',
                glyphMarginClassName: 'myGlyphMarginClass',
              },
            },
          ]
        );

        breakpoints.set(position.lineNumber, id[0]);
        setBreakpoints(Array.from(breakpoints.keys()));
        addLog(`Breakpoint added at line ${position.lineNumber}`);
      };

      const removeBreakpoint = () => {
        const position = editor.getPosition();
        if (breakpoints.has(position.lineNumber)) {
          const id = breakpoints.get(position.lineNumber);
          editor.getModel().deltaDecorations([id], []);
          breakpoints.delete(position.lineNumber);
          setBreakpoints(Array.from(breakpoints.keys()));
          console.log(`Breakpoint removed at line ${position.lineNumber}`);
          addLog(`Breakpoint removed at line ${position.lineNumber}`);
        }
      };
      editor.addCommand(monaco.KeyCode.F9, addBreakpoint);
      editor.addCommand(monaco.KeyCode.F8, removeBreakpoint);

      console.log('Key commands registered');

      return () => {
        editor.removeCommand(monaco.KeyCode.F9);
        editor.removeCommand(monaco.KeyCode.F8);
      };
    }
  }, [editor, setBreakpoints, setLogs]);

  return null;
};

export default Debugger;
