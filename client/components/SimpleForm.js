import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

export const SimpleForm = ({
    onSubmit,
    label,
    buttonText = 'Create',
    isClearAfterSubmit = false
}) => {
    const [value, setValue] = useState('');

    return (
        <form onSubmit={ (e) => {
            e.preventDefault();

            if (!value) {
                return;
            }

            onSubmit?.(value);
            if (isClearAfterSubmit) {
                setValue('');
            }
        } }>
            <VStack spacing="4" align="flex-start">
                <FormControl>
                    <FormLabel>
                        { label }
                    </FormLabel>

                    <Input value={value} onChange={ (e) => setValue(e.target.value) }/>
                </FormControl>

                <Button colorScheme="green" type="submit" isDisabled={ !value }>
                    { buttonText }
                </Button>
            </VStack>
        </form>
    )
}
