import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import InputText from '@/components/Form/InputText';

export default function FormInit() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => Alert.alert(
    "Form Data",
    JSON.stringify(data),
  );

  return (
    <View>
      <Text>First name</Text>
      <Controller
        as={TextInput}
        control={control}
        name="firstName"
        onChange={args => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Text>Last name</Text>
      <Controller
        as={TextInput}
        control={control}
        name="lastName"
        onChange={args => args[0].nativeEvent.text}
        defaultValue=""
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
