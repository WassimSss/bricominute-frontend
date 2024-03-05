import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function RadioButton({ options, style, handleRadio }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        handleRadio(option)
    };

    console.log(selectedOption);
    return (
        <View style={style}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option}
                    onPress={() => handleOptionSelect(option)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <View
                        style={{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: selectedOption === option ? '#B14A73' : 'gray',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {selectedOption === option && (
                            <View
                                style={{
                                    height: 12,
                                    width: 12,
                                    borderRadius: 6,
                                    backgroundColor: '#B14A73',
                                }}
                            />
                        )}
                    </View>
                    <Text style={{ marginLeft: 10 }}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};
