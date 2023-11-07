import React from 'react';
import { Ellipse, G, Path } from 'react-native-svg';
import { SvgIcon } from '../SvgIcon';
import type { IconProps } from './IIconProps';

function IconMoneyRed({ color }: IconProps) {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 34.891 22.48">
      <G
        id="_7055174_consultation_money_income_profit_budget_icon"
        data-name="7055174_consultation_money_income_profit_budget_icon"
        transform="translate(0 -1.117)"
      >
        <Path
          id="Subtração_2"
          data-name="Subtração 2"
          d="M2051.837-2529.4h-28.688a.415.415,0,0,1-.42-.408v-15.765a.415.415,0,0,1,.42-.409h20.141c-.018.208-.028.423-.028.639q0,.09,0,.179h-14.469a6.541,6.541,0,0,1-5.226,3.87v7.206c3.246.223,4.821,3.019,5.226,3.87h17.4a6.543,6.543,0,0,1,5.226-3.87v-3.6h.058c.262,0,.525-.011.782-.034v7.917A.414.414,0,0,1,2051.837-2529.4Zm-.42-3.866a5.5,5.5,0,0,0-4.292,3.048h4.292v-3.048Zm-27.849,0v3.049h4.3a5.428,5.428,0,0,0-4.3-3.049Zm0-11.9v3.049a5.577,5.577,0,0,0,4.293-3.049Z"
          transform="translate(-2022.729 2553)"
          fill={color || '#323232'}
        />
        <Path
          id="Caminho_540"
          data-name="Caminho 540"
          d="M239.942,79.744h-.035c-1.469-.038-1.736-.91-1.745-.942a.413.413,0,0,0-.29-.306.428.428,0,0,0-.415.1.4.4,0,0,0-.109.4,2.309,2.309,0,0,0,2.129,1.532v1.085a.42.42,0,0,0,.84,0V80.531a2.591,2.591,0,0,0,2.1-1.93c.119-.582.128-2.035-2.369-2.973-1.338-.5-2.016-1.248-1.848-2.045a1.773,1.773,0,0,1,1.65-1.3h.035c1.459.038,1.733.9,1.746.946a.421.421,0,0,0,.508.287.409.409,0,0,0,.306-.488,2.31,2.31,0,0,0-2.128-1.532V70.409a.42.42,0,0,0-.84,0v1.08a2.573,2.573,0,0,0-2.1,1.93c-.119.582-.128,2.036,2.369,2.974,1.338.5,2.011,1.248,1.848,2.045A1.774,1.774,0,0,1,239.942,79.744Z"
          transform="translate(-225.132 -60.704)"
          fill={color || '#323232'}
        />
        <G id="Icon_feather-clock" data-name="Icon feather-clock" transform="translate(22.769 1.617)">
          <Path
            id="Caminho_541"
            data-name="Caminho 541"
            d="M14.623,8.935A5.874,5.874,0,0,1,8.811,14.87,5.874,5.874,0,0,1,3,8.935,5.874,5.874,0,0,1,8.811,3a5.874,5.874,0,0,1,5.811,5.935Z"
            transform="translate(-3 -3)"
            fill="none"
            stroke="#D71921"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
          <Path
            id="Caminho_542"
            data-name="Caminho 542"
            d="M18,9v3.981"
            transform="translate(-12.189 -6.626)"
            fill="none"
            stroke="#D71921"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Ellipse
            id="Elipse_267"
            data-name="Elipse 267"
            cx="1.027"
            cy="1"
            rx="1.027"
            ry="1"
            transform="translate(4.785 8.383)"
            fill="#D71921"
          />
        </G>
      </G>
    </SvgIcon>
  );
}

export default IconMoneyRed;
