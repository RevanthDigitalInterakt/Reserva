import React, { useEffect, useState, useRef, memo } from "react";
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import TransformUtil from '../../../../utils/transformUtil';
import FlipCard from './FlipCard';
import Card from './Card';

const { width } = Dimensions.get('window');

class NumberCard extends React.Component {
    constructor(props) {
        super(props);
        this.rotateFront = new Animated.Value(0);
        this.rotateBack = new Animated.Value(-180);

        this.frontRef = null;
        this.backRef = null;
    }

    componentDidMount() {
        const { size } = this.props;
        this.animateTick();
        this.rotateFront.addListener(({ value }) => {
            this.transformRef(this.frontRef, value, size * 0.23);
        });

        this.rotateBack.addListener(({ value }) => {
            this.transformRef(this.backRef, value, -size * 0.23);
        });
    }

    shouldComponentUpdate(nextProps) {
        const { previousNumber } = this.props;
        if (nextProps.previousNumber !== previousNumber) {
            this.animateTick();
        }
        return true;
    }

    setFrontRef = (ref) => {
        this.frontRef = ref;
    }

    setBackRef = (ref) => {
        this.backRef = ref;
    }

    animateTick = () => {
        this.rotateFront.setValue(0);
        this.rotateBack.setValue(-180);
        Animated.parallel([
            Animated.timing(this.rotateFront, {
                toValue: 180,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(this.rotateBack, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }

    transformRef = (ref, deg, y) => {
        const { perspective } = this.props;
        const matrix = TransformUtil.createIdentityMatrix();
        TransformUtil.translateMatrix(matrix, { x: 0, y, z: 0 });
        TransformUtil.perspectiveMatrix(matrix, perspective);
        TransformUtil.rotateXMatrix(matrix, deg);
        TransformUtil.untranslateMatrix(matrix, { x: 0, y, z: 0 });
        if (ref) {
            ref.setNativeProps({ style: { transform: [{ matrix }] } });
        }
    }

    render() {
        const {
            number, previousNumber, size, clockBackgroundColor, colorDivider
        } = this.props;
        return (
            <View style={[style.numberWrapper,
            { backgroundColor: clockBackgroundColor, width: size, height: size / 1.1, borderRadius: size / 10, margin: 0, padding: 0 },]}
            >
                <Card
                    type="upper"
                    size={size}
                    number={previousNumber}
                    colorDivider={colorDivider}
                />
                <Card
                    type="lower"
                    size={size}
                    number={number}
                    colorDivider={colorDivider}
                />
                <FlipCard
                    clockBackgroundColor={clockBackgroundColor}
                    setRef={this.setFrontRef}
                    type="front"
                    size={size}
                    number={number}
                    colorDivider={colorDivider}
                />
                <FlipCard
                    clockBackgroundColor={clockBackgroundColor}
                    setRef={this.setBackRef}
                    type="back"
                    size={size}
                    number={previousNumber}
                    colorDivider={colorDivider}
                />
            </View>
        );
    }
}

NumberCard.defaultProps = {
    size: width / 8,
    perspective: 250,
};

NumberCard.propTypes = {
    number: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    previousNumber: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    perspective: PropTypes.number,
    size: PropTypes.number,
    clockBackgroundColor: PropTypes.string,
    colorDivider: PropTypes.string,
};

export default NumberCard;

const style = StyleSheet.create({
    numberWrapper: {
        backgroundColor: '#1A1A1A',
    },
});