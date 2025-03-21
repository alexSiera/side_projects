import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useContext, useRef } from "react";
import { ChatContext } from "./ChatContext";

interface Props {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: Props) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <form className='mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
        <div className='relative flex h-full flex-1 items-stretch md:flex-col'>
          <div className='relative flex w-full flex-grow flex-col p-4'>
            <div className='relative'>
              <Textarea
                rows={1}
                ref={textareaRef}
                maxRows={4}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                    textareaRef.current?.focus();
                  }
                }}
                placeholder='Enter your question...'
                className='scrollbar-thumb-rounded scrollbrar-track-blue-lighter scrollbar-w-2 scrolling-touch resize-none py-3 pr-12 text-base'
              />
              <Button
                className='absolute bottom-1.5 right-[8px]'
                aria-label='send message'
              >
                <SendIcon className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
