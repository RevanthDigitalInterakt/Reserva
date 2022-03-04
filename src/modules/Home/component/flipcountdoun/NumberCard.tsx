import React, { useEffect, useState, useRef, memo } from "react";
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import TransformUtil from '../../../../utils/transformUtil';
import FlipCard from './FlipCard';
import Card from './Card';

const { width } = Dimensions.get('window');

// interface INumberCard {
//     number: any;
//     previousNumber: any;
//     size: any;
//     numberWrapperStyle: any;
//     perspective: any;
// }
// const NumberCard = ({
//     number,
//     previousNumber,
//     size = width / 6,
//     numberWrapperStyle,
//     perspective = 250
// }: INumberCard) => {
//     const refFront = useRef(null);
//     const refBack = useRef(null);
//     const [rotateFront, setRotateFront] = useState(new Animated.Value(0));
//     const [rotateBack, setRotateBack] = useState(new Animated.Value(-180));

//     useEffect(() => {
//         animateTick();
//         rotateFront.addListener(({ value }) => {
//             transformRef(refFront.current, value, size * 0.3);
//         });
//         rotateBack.addListener(({ value }) => {
//             transformRef(refBack.current, value, -size * 0.3);
//         });
//     }, []);

//     React.memo((props) => {
//         if (props.previousNumber !== previousNumber) {
//             animateTick();
//         }
//         return true
//     })

//     const animateTick = () => {
//         rotateFront.setValue(0);
//         rotateBack.setValue(-180);
//         Animated.parallel([
//             Animated.timing(rotateFront, {
//                 toValue: 180,
//                 duration: 800,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(rotateBack, {
//                 toValue: 0,
//                 duration: 800,
//                 useNativeDriver: true,
//             }),
//         ]).start();
//     }

//     const transformRef = (ref, deg, y) => {
//         const matrix = TransformUtil.createIdentityMatrix();
//         TransformUtil.translateMatrix(matrix, { x: 0, y, z: 0 });
//         TransformUtil.perspectiveMatrix(matrix, perspective);
//         TransformUtil.rotateXMatrix(matrix, deg);
//         TransformUtil.untranslateMatrix(matrix, { x: 0, y, z: 0 });
//         if (ref) {
//             ref.setNativeProps({ style: { transform: [{ matrix }] } });
//         }
//     }

//     return (
//         <View style={[style.numberWrapper,
//         { minWidth: size * 0.8, height: size * 1.2, borderRadius: size / 10 },
//             numberWrapperStyle]}
//         >
//             <Card
//                 type="upper"
//                 size={size}
//                 number={previousNumber}
//             />
//             <Card
//                 type="lower"
//                 size={size}
//                 number={number}
//             />
//             <FlipCard
//                 setRef={refFront}
//                 type="front"
//                 size={size}
//                 number={number}
//             />
//             <FlipCard
//                 setRef={refBack}
//                 type="back"
//                 size={size}
//                 number={previousNumber}
//             />
//         </View>
//     );
// }

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
            this.transformRef(this.frontRef, value, size * 0.3);
        });

        this.rotateBack.addListener(({ value }) => {
            this.transformRef(this.backRef, value, -size * 0.3);
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
            number, previousNumber, size, numberWrapperStyle,
        } = this.props;
        return (
            <View style={[style.numberWrapper,
            { Width: size * 0.8, height: size * 1.2, borderRadius: size / 10, margin: 0, padding: 0 },
                numberWrapperStyle]}
            >
                <Card
                    type="upper"
                    size={size}
                    number={previousNumber}
                />
                <Card
                    type="lower"
                    size={size}
                    number={number}
                />
                <FlipCard
                    setRef={this.setFrontRef}
                    type="front"
                    size={size}
                    number={number}
                />
                <FlipCard
                    setRef={this.setBackRef}
                    type="back"
                    size={size}
                    number={previousNumber}
                />
            </View>
        );
    }
}

NumberCard.defaultProps = {
    size: width / 6,
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
};

export default NumberCard;

const style = StyleSheet.create({
    numberWrapper: {
        backgroundColor: '#1A1A1A',
        shadowColor: '#1f1f1f',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        elevation: 5,
    },
});