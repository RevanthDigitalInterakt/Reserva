import React from 'react';
import { TextInput, View } from 'react-native';
import { Box } from '../Box/Box';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { theme } from '../../base/usereservappLegacy/theme';
import { Button } from '../Button';
import { Typography } from '../Typography/Typography';
import { COLORS } from '../../base/styles';

interface SearchBarProps {
  height?: number;
  iconName?: string;
  placeholder?: string;
  value?: string;
  autocomplete?: string[];
  onClickIcon?: () => null;
  onClickAutocomplete?: (clickedItem: string) => null;
  onValueChange?: (value: string) => null;
  testID?: string;
}

export function SearchBar({
  height = 36,
  iconName,
  placeholder,
  autocomplete,
  value,
  onValueChange,
  onClickIcon,
  onClickAutocomplete,
  testID,
}: SearchBarProps) {
  return (
    <Box>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.LIGHT_GRAY,
          borderRadius: 10,
          height: 45,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          placeholder="O que você procura?"
          onSubmitEditing={() => onClickIcon && onClickIcon()}
          style={{
            marginLeft: 10,
            fontSize: 14,
            padding: 0,
            fontFamily: theme.fonts.reservaSansRegular,
            fontWeight: 'normal',
            lineHeight: 14,
          }}
          onChangeText={(text) => {
            if (onValueChange) {
              onValueChange(text);
            }
          }}
        />
        <View style={{ marginRight: 20 }}>
          <IconLegacy name={iconName || 'Search'} size={18} />
        </View>
      </View>
      {autocomplete && autocomplete.length > 0 && (
        <Box backgroundColor="white" paddingY="xxxs">
          {autocomplete.map((item) => (
            <Button
              key={`autocomplete-search-${item}`}
              inline
              onPress={() => {
                if (onClickAutocomplete) {
                  onClickAutocomplete(item);
                }
              }}
            >
              <Box width="100%" paddingY="nano" paddingLeft="xxxs">
                <Typography variant="botaoFiltrarEOrdenarProdutos">
                  {item}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>
      )}
      {/* <Box
        height={height}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="nano"
        backgroundColor="backgoundInput"
        paddingX="nano"
      >
        <Box
          ml="quarck"
          mr="nano"
        >
          <IconLegacy name={iconName || 'Search'} size={18} />
        </Box>
        <Box flexGrow={1}>
          <TextInput
            placeholderTextColor={theme.colors.searchBarTextColor}
            placeholder={placeholder}
            returnKeyType="search"
            enablesReturnKeyAutomatically
            onSubmitEditing={() => onClickIcon && onClickIcon()}
            onChangeText={(text) => {
              if (onValueChange) {
                onValueChange(text);
              }
            }}
            testID={testID}
            value={value}
            style={{
              color: theme.colors.searchBarTextColor,
              fontFamily: theme.fonts.nunitoRegular,
              fontSize: 15,
              padding: 0,
            }}
          />
        </Box>

      </Box>

      {autocomplete && autocomplete.length > 0 && (
      <Box backgroundColor="white" paddingY="xxxs">
        {autocomplete.map((item) => (
          <Button
            key={`autocomplete-search-${item}`}
            inline
            onPress={() => {
              if (onClickAutocomplete) {
                onClickAutocomplete(item);
              }
            }}
          >
            <Box width="100%" paddingY="nano" paddingLeft="xxxs">
              <Typography variant="botaoFiltrarEOrdenarProdutos">
                {item}
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
      )} */}
    </Box>
  );
}
