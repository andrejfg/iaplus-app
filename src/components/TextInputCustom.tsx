import React from 'react'
import { View, Text, TextInput, StyleProp, TextStyle } from 'react-native'
import { useFormContext, Controller } from 'react-hook-form'
import tw from '@/lib/tailwind'

interface TextInputCustomProps {
  name: string
  label: string
  placeholder: string
  multiline?: boolean
  styleInput?: StyleProp<TextStyle>
  styleLabel?: StyleProp<TextStyle>
}

const TextInputCustom: React.FC<TextInputCustomProps> = ({
  name,
  label,
  placeholder,
  styleInput,
  multiline,
  styleLabel,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <View style={tw`w-full flex-1`}>
      <Text style={[tw``, styleLabel]}>{label}</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            placeholder={placeholder}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            cursorColor={'#1976f0'}
            multiline={multiline}
            style={[
              tw`h-10 w-full flex-1 rounded-lg border border-gray-400 p-2`,
              styleInput,
              { textAlignVertical: multiline ? 'top' : 'center' },
            ]}
          />
        )}
        name={name}
        rules={{ required: errors.root?.message }}
      />
      {errors[name] && (
        <Text style={tw`text-[#F53131]`}>
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  )
}

export default TextInputCustom
