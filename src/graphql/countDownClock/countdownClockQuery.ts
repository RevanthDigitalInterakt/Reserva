import { gql } from '@apollo/client';

export interface ICountDownClock {
  title: string;
  subtitle: string;
  watchType: number;
  countdownStart: number;
  countdown: string;
  titleButton: string;
  titleModal: string;
  descriptionModal: string;
  categoryReference: string;
  selectClockScreen: string;
  reference: string;
  formattedValue?: string | undefined;
}

export const countdownClockQuery = gql`
  query CountdownClockCollection(
    $selectClockScreenHome: String, 
    $selectClockScreenAll: String,
    $selectClockScreenCategory: String, 
    $selectClockScreenOffers: String) {
    countdownClockCollection (where: { OR: [
        { selectClockScreen: $selectClockScreenHome }
        { selectClockScreen: $selectClockScreenAll }
        { selectClockScreen: $selectClockScreenCategory }
        { selectClockScreen: $selectClockScreenOffers }
      ]}) {
        items {
            watchType
            selectClockScreen
            categoryReference
            title
            subtitle
            countdownStart
            countdown
            titleButton
            titleModal
            descriptionModal
            reference
        }
    }
  }
`;

