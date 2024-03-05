import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function RadioButton({ options }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <View>
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
                            borderColor: selectedOption === option ? 'blue' : 'gray',
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
                                    backgroundColor: 'blue',
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
