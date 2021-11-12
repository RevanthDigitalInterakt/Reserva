import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Image, theme, Typography } from "reserva-ui"
import { backgroundColor, margin, marginRight } from "styled-system"
import { HeaderCorreReserva } from "../../components/HeaderCorreReserva"

export interface RaceFinalizedProps {

}

export const RaceFinalized: React.FC<RaceFinalizedProps> = ({

}) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
      <HeaderCorreReserva />
      <Box justifyContent='center' alignItems='center' marginTop={30}>
        <Typography
          color='white'
          fontFamily='reservaSerifBoldItalic'
          fontSize={50}
          letterSpacing={-2.5}
          textAlign='center'
        >
          {` Parabéns! `}
        </Typography>
        <Typography
          fontFamily='reservaSerifLight'
          fontSize={15}
          color='white'
          lineHeight={19}
          textAlign='center'
        >
          Sua corrida contribuiu com
        </Typography>

        <Box
          alignItems='center'
        >
          <Typography
            color='white'
            fontFamily='reservaSerifBold'
            fontSize={152}
          >
            {`25`}
          </Typography>

          <Box
            position='absolute'
            bottom={-15}
          >
            <Typography
              color='white'
              fontFamily='reservaSerifThin'
              fontSize={29}
            >
              Pratos viabilizados
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box paddingTop={25}>
        <Typography
          color='white'
          fontFamily='reservaSansRegular'
          fontSize={16}
          textAlign='center'

        >
          Compartilhe nas suas redes:
        </Typography>
        <Box
          marginTop={10}
          marginBottom={26}
          flexDirection='row'
          justifyContent='center'
        >
          <SocialButton />
          <SocialButton />
          <SocialButton />
          <SocialButton />
        </Box>
        <TouchableOpacity
          style={{
            marginHorizontal: 49,
            flexGrow: 1,
            height: 50,
            backgroundColor: '#11AB6B',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            color='white'
            fontSize={13}
            fontFamily='nunitoSemiBold'
            letterSpacing={0.16}
            style={{ textTransform: 'uppercase' }}
          >
            IR PARA A HOME
          </Typography>
        </TouchableOpacity>

      </Box>
    </SafeAreaView >
  )
}

const SocialButton = () => {
  return (
    <Box
      style={{
        marginHorizontal: 7.5,

      }}
    >
      <TouchableOpacity
        style={{
          width: 32,
          height: 32,
          borderRadius: 31,
          overflow: "hidden"
        }}
      >
        <Image source={{
          uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDxAODhAPDg8PEBUPDQ0NEA8PDQ8QFRUYFhUVFRUYHSggGBolGxUVIjEhJSkrLy4uFx8zODMtNygtLysBCgoKDg0OGhAQGi0lHiUtLS0tLi8tLS0tLy0rKy0tKysvKy0tLS8tLSstLSstLS0rLS0rLS0rLSstLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQMGBwIEBQj/xABQEAABAwIBBwUHDwoFBQAAAAABAAIDBBESBQYhMUFRYQcTcYGRIjJSkqGxwSMkQlNicnSCoqOys8LR0hQVFyU0Q1SD0+IWY3OT8DNEZMPh/8QAGgEAAQUBAAAAAAAAAAAAAAAAAwECBAUGAP/EADgRAAEDAQQGCAUEAgMAAAAAAAEAAgMRBBIhMQVBUXGR0RMiUmGBobHwFDI0weEVQnKyIzMkYoL/2gAMAwEAAhEDEQA/ALxQha1bVxwRullcGRsF3OdqA9J4bV2eAXLZUUy1n1SU92R3qZBoIiIEQPGTV2XUJzqzxmrC6KIuhptWAaHyjfIRs9zq33UYurmz6MGDpuHM8kB8hyapdX5/V0l+bMdO3YI2BzrcXPv5AFxpsvVknf1U54CV7W9gNlzLoxKyZBGz5WgeCCQ45lPvq5Hd9JI73z3H0rAvO89pTWJJdEXdGncSTEm7oukqnCJOYkYlhdF00uRGwrPEjEsLoukvIzYVniSYljdF0l5FbAssSLrC6LrryKIVliRiWN0l0lUVsKyxHee1ZsqZG9697eh7h6UzdKuqiiBb8OW6tneVVS3gJpbdl7LrUOflfEe6kZO3wZmDV75tj23UZQmujjdg5oPgnfDt2K1ci8odNMQyoaaZ50YycUB+Nrb1i3FTGOQOAc0hzXC4c0gtIOog7V54su7m3nPUULgGkyQE93A49zxLD7F3kO0Kvn0c0isWB2avfvBAksmtiu5C5+SMqQ1cLZ4HYmHQQdDmO2tcNhH/ADQugqkgg0KhEUwKEIQkSIVOZ85zGsmMUTvWsLrMtqleNBkPDWBw07VNeUnLH5NR80w2lqSYmkaxGB6o4dRDfjqnbq40ZZxTpXeH3P2C4tJTmJF1hiSYlbVXdEnbpbpm6yxJKpwhTl0XTV0t02qIIVndZXWVNSyy/wDRjkl/0o3yfRBXRizYyg7SKSo+Mws+lZDdIG5lEEIGa5l0XXbbmdlM6qR/W+IedyzGZGVP4Y/7tP8AjQjPH2hxHNFDGbRxXBui67/+B8p/w3z1P+NL/gfKf8P89T/jSdPH2hxHNEDY+0OI5qPXS3Ug/wAD5T/h/nqf8aP8D5T/AIf56n/Gk6ePtDiOaKOj7Q4jmo9dLdSA5j5T/hz/AL1N+NYHM3KQ/wC1d1PhPmcu6ZnaHEJ4MXaHEc1wULsSZrZQbrpZvisx/RJWhU5PqItMsM0Y3yxSRD5QSiQHIjiEVoYciFrIslCE+8n3EiFkkXXkl1FkWQsk68uursZq5ekoZw8XdG+zZoh7Jm8e6GsdY2q6aedsjGyRkOY9ocxw1OaRcELz6rK5Lsrl8b6N5uY/VYb6+bce6HU4g/H4Kvt8Ic3pBmM9349NygWyDq3xqz3KfIQhVKrFTXKhXmXKBiB7mnjbGBsxOGNx+U0fFURXTzlmMldVvO2plA96HlrfIAubZaiEXI2tGoBS2twQhLZFk4uRA1YrJLZWRmHmYLMrKxlybOgp3jQBse8bTubs1nTqBNaGxNvFK6jBUrgZt5j1NWBLJ63gOnG9p52Qe4Zu4m3C6sTJWZdBTAEQiZ4/eVNpXX3gHuR1AKRoVLNa5JNdBsCiPmc7uCxa0AWAAA1AaAFkuXXZdo4CWzVETHDWzEDJ4g0+RcmXP7Jw1SPf72GQfSAQRG85A8EjYnuxa0nwUqQoa/lFoRqbUu6I2DzvCx/STRe1VfiQ/wBRL0MnZKJ8LN2SpohQv9JVF7TV+JB/USfpKovaavxIP6iXoZNiX4SbslTVChf6SqL2mr8SD+oj9JNF7VV+JD/UXdDJsXfBz9kqaIULHKTRe1VfiQ/1EreUahPsalvSyP0PSdDJ2Su+Dn7BUzQorHn/AJPOt8jPfRuP0brp0eclDMQIqmIuOpj3c289DX2JSGN4xIKG6zytFXMPApvKWatFUXMkDGvP72Ic1JfeS3X13UFy/mBPCDJSuNRGNJjsBOB0DQ/qseCtVCfHaJGZHDYnw2qSLI1GwrzwUitXPTNBtSHVFO0NqALvYLBtQBv93uO3UdhFWOaQSCCCDYggggjWCNitIphI2oV5Z5mzNvN8RsWKEqEa8jXUi7WZtbzFdTuvYPkET9xbJ3GngCQepcZKx5a5rm62nE3pGkJT1gW7cOKY6O8C3bhxXoZC5v55i4oWeoVmaFUPWOxSyO8KR7u1xKZSv1npSLSVViG4ISoS2TS5GaxSrk+yCKuo5yUXggs94Op8h7xnEaCT0AbVcijuYmTRTUMIIs+Uc/JsN3gEA9DcI6lIlSWmUvedgVbO+887AtHKuUYqWJ007sDG9bnHY1o2k7lVGcOedTVktY51PBsijcWvcPdvGk9A0dOtGfmXTV1LmNPqEDjHEBqc4aHv43OgcBxKjakwQhoqc/RWVlsgaA5wx9EiFkkUguViGoSoQm3k8NQiyVCbeT7qSyLLJCW8lurFCyskslvJ11Ii67GbeQJa6UsYcDGAGWRwu1gOrRtJsbDgVPo+TqiDbF1Q53tmNgN+Aw28iY6drDQqLNa4YHXXHHuCguQs6KqjIDHmSIa4JC58dvc7W9WjgVa2QctQ1sIliNiNEkbrY43bj6DtVYZ2ZrSULmuDucgccMclrOa7XhcN9r2I12OpaWbWWH0VQyZtyzvZmD2cZOnRvGscRxKHJG2Vt5ufvzUe0WWO1R9JFnqI19x7/PbmryVY8pWQhG9tZELNkOCcDUJbEh/xgCDxA2lWVHIHAOaQWuALSNRB1FamW6AVNNNAbeqMIaT7F40sd1OAPUokMlxwPuip7LP0Mgdq17veKodCycCNBFiNBB1g7QkVxVagtQhCE4FNuqS/ng7/ADoUcxnehC6Jqi/Ct2LUKLJSEoCMXKK1qQLYoqfnZY4vbJGR+O4N9KaXXzSixZQpAfb2u8U4vQgvfQEo1LrSdnJXkxoAAGgAWA3Bc7OOsMFJUTNNnMidgPuyLM+UQumorykyWydIPDfG3scHfZVQwVcAqOFgdI1u0geaqCyEJVZFy1IakSoSpl5EDUiVPUtNJM9sUTHPe82axgu4/cOJ0BWJm/yfxsAkrTzj9fMxkiMe+cNLj0WHSmOkDc0Ke0RQCrz4a/e+irqCmkkdhjZI8+Axrnu7BpXWgzUyi8XbSyfzLRnseQVclHSRQtDIY2RMGpsbQ1vYFsIBnOoKrdpd1eoweJJ9KKlZM0cotFzTP+K5jz2NJXLq6KaE2mjkjJ1CRjmE9GIaVfyamha9pY9rXtOgteA5pHEFcJzrXM0w/wDeweGHrVUAhWll7MOnmBfTet5NeD/t3H3vsPi6OBVb5SydNTSGKdhY4aRfS1w8Jp1EIrZA5WtmtUVoHUOOw5/nwVk8mDW/kUhHfGodzm+4ayw7LdqmKpvNHOR1DI4OBfDJbnGNtiaRqe2+i/Db1Kw2Z55PLcf5Q0b2ubIHj4trnqQJGG9VU1vsc3TFzWkg7BXwPelz4a05OqcdtDQW38IPGHy2VMqXZ551/lgEEAc2BrsT3P0PkcNWjY0a7b7arKJWUmAFrcVaaOs74YaPzJrTZl5q4cwa0zUEVzd0JMDviHuR4hapIoNyVSetp2bpw7xmNH2VOVEkFHlUFtYGWh4G31xVI53U3NV9THsMpkA/1LSfaXHUo5SI8OUHnw443HxcP2VF1ZROqwblprOb0THdw9EIWSESqIQsULJInVSUWuVkkKVNc5V7WpV3cxW3ylSj3bj2McfQuEpBmAP1nTdMn1L0GR3VKfK3/E/+J9FdSh3Ki61E0eFUMHyJD6FMVC+VQ+sovhTfq5VXs+YKjsYraGb1VaEJVLvLVhqRP0lM+aRkUTS973BrGjWSfRtvsAKZVlcmeRAyM1sg7uS7Ib+xYDZzukkW6G8UNz6BDtUws8RefDvPvE7l3s183YqCKws+Z49VltpPuW7mjy6yu+hRrOzOZlCzC0B87xdkZ71o1Y322X2be0iNiSssBLaZaZuPvwAHgAu5WVkULMcz2Rs8KRwaL7tO1R2pz+yew2DpJbe1MsO1+FVflHKM1TIZJpHSOOou1NG5o1NHALURLg1q8h0LGB/kcSe7AelTvwVs0/KBQONnc9FxfGCPkFykGT8pQVDcUEscoGvA4Et98NYPSqGsnqapfE8SRPcx7e9ewlrh17uGorrgSy6FiI6hIPfiOa9ALl5dyPDWRGKUcWSDv43b2n0bVw8zs7G1YEE9m1DRdpGhk4GstGxw2jrG0CYIeIKopI5bNLR2Dh7qFQ+V8mPpJnwSizm6QR3r2HvS3gfQRsWorYz+yKKmmMrR6rTtL221ujt3beOjSOI4qplIY+oWpsNpFpiDtYwO/kc+KVCRKn1UuisPkmd3NWNxjPbzn3KwFXnJMf2z+V55VYajy/MVk9KClqf4f1CqrlQFq5nGnYflyD0KHKZ8qY9eRfBmfTlUOUuE9QLQWL6dm5CRCVHBUhCEJEtUlEyUoS4VmGITnhQ2tWFlIuT5v6zpv5n1Mi4QYpHmC39ZU/RJ9S9Rny4JZh/hf/E+hVwqGcqP7FH8Kb9VIpmofynfscXwlv1cijVpis/YPqWb/sqrwpcKfwpMK7plrgkpqd0kjI298+RrG++JAHlKvajp2xRxwsFmxsbGwcGiw8yqPNCAOr6YHw8fWwFw8rVci4PvKh00/rMZ3V4mn2WtW1TYopJXd7Gx0jt9mi+hUblWtkqZpJ5Tdz3YiL6GjYBwtYdStPlEnLKBzRo5yRkfV3/2FVBakv0KlaFhAjdKcyaeAp6nPcmbJVmWrEtRBICruiRCLITg5LRZwTOY5r2OLXNIcx7dbXDSCFdub2UhV00U4sC9tpGjU2QaHDouDbhZUerJ5KqgmGoh2Mla8cMTbf8ArSOVRpmAOg6TW0+RND5kKdqjM4aH8mq54Roax55sbmu0tHY5qvNVPymQhtdiH7yBjj04nN8zAkYcVXaEkImczUR5j8VUUSJUIwWmop/yT66v+V55FYirvkm11f8AK88isRBf8yyOlfq3bm/1Cq3lTHruL4O36cihqmXKn+2RfB2/TkUOUiE9ULQWH6Zm5IhCFIBUkpEJUJU1ZhqUNTmFZhqq3zKO0JsNUhzEb+sYOiT6p64oau9mQP1hB0SfVPUfpKlJP/pf/F39SrYUR5Sx6zj+Et+rkUuUU5Rv2SP4Q36uRElNGErOWD6lm/7FVnhRhT2FLhUHpVr10szyG19OT4RHjNLR51bypSilMUsco0mN7ZAN5aQfQrmilD2te03a4BzTvBFwVJs771Qs/ptnXY/aKcMfuo3yiQl1Dcfu5WvPQbs+2FVxaruynSNnhkhdoEjC2/gnYeo2PUqcqqZ0b3RyDC5ri143EehJObpqpehZgYnR6wa+B/K0y1IWp8tWJahtkV0mC1Nlq2S1NlqM2ROCYIVj8lNORHUy7HvjZ1taXH6wKvgz2IBJOgAC5J3AK5M1cmfklJFEe/tjl/1Haxxtob1I7XVVVpqYMs1zW4jyxP24rtKqeU6S9cweDAxp6cT3faCtZUhnVWCoraiUG7S8sYdhawBoI4EC/WnNzVZoOMmcu2D1I9+C5SVIhFBWoop/yTa6v+V55FYqrvkm11f8rzyKxEN+ax+lvq3bm/1Cq7lS/bIvg7fpyKGqZcqf7ZH8Gb9ORQ1Gi+VaGwfTR7khQlQVIaVJSJEqROqkW/hWYanMKUNWcfIo4WIau7mUPX8Hx/qnrkBq7GaWiugPF3lY4ITZOu3ePVMn/wBL/wCLv6lWkotyhD1qz4Q36D1KVGc/G3pG8Jmn5Lx6VYWg0ice5ZqwfUs3qusKMKdwowqk6Ra5NYVYWY2U+cg5hx9Uh1X1ui2Hq1digVk/k+rfTytljNi0306nDa08Ciw2jo311a1HtlnFoiLNeY3/AJy8Vb6i2dubYqhz0IAnaLOboAmaNQvscNh6jst2ck5SjqYxJGeD2HvmO3H79q6CuSGyN2grKxyS2aWowcPdCqSmhcxxY9pBabOa4EOB4gpstVwZRyRT1AtLGHEaA8XEg6HDTbhqUeqMwoSfU5pGjdIxr/NhUF1mkacMVooNMQPHXq0+JHlU+SrwtWODYNJJsANJJOoBWHBmDGD6pUSPG5kbWHtJcu9kvIFLTaYowX+2Sd3J1HZ1WT44ZNeCdLpmzsHUq48PM8io5mbmmYi2qqW+qa4YXDTGfCd7rcNmvXqnKFqZQro6eJ0szg1jRpO0nYANpO5TGtDQs7aLRLapbzsScAB5ABcnPLLH5JSusbSy3igtrBI0v+KNPTbeqc1Lt5xZXfWzmV3ctHcxMvoY3d0nWT9wXHc1NbICVrNG2T4aG6fmOJ5eHrXUsEIIQjgqerB5Jh+1/wAnzyqw1X3JM3RVneYR2CT71YKac1jdLfVv/wDP9Qqt5Uj68i+DM+nKoaphyon16zhTsHy5D6VEEWP5Vo7CP+NHuQhCEYFSCkshCE6qRdkNWQasg1ZhqyTnqMEgaujm4cNZAf8AMA7dHpWkGrYoZObmjk8CRr/FcD6EISXXAnaue280t2gjiFbK4Gejb0bj4L2Hy29K765+XKfnKaZg0kxlzRvc3ugO0BX9oaTG4dx9FkrM8NmY46iPVVdhRhTuFJhWXvrZLDCscKdwowrr6WqzoK2WneJIXYTqI1tcNzhtCnOSM6IZwGyEQybnECNx9y70HyqBWSFqkwWt8WWWxRbTYorR82B2jPkrfQqqpMqVEGiKV7Rsbe7PFNx5F0o88atusRP4vYb/ACSFZs0lGcwR5qofoaUHquBHiOfqrDQq9kzzqzqbC3i1jr+VxXJrct1cws+aSx1tYQxpG4htr9aebfH+0EpGaGmJ6xA4n7Kd5Yzlp6UEF3OyD91EQSD7o6m+fgq6y5lmarfilNmt7yJveNHDeeJ/+LVLVg4IDrS5+5Xdk0fFZsRi7afts9dVaLVc1YOC2HBNOCKx6sFruasU84JpwUxj05WRyVR+t53b5mt7GA/aU6UY5PKTmqCMkWMrnTEdPcg9YaD1qToixGkXh1qkI204YKpOUiS9e4eDFG3yF32lFl2s86gSZQqXX0CTBb/TAjPlBXGRm5BayysuQRt/6j0CRKhCIEVCRKhOSKQ4VkGp6WOznDc4jsKA1Yp7lFBwWAassKcDVkGoLnLqqwsg1XPU8T73cGhjztxN0HttfrXTULzSrubkMLjZkh7i+oSah2jR1BTRaWxT9LEHaxgd/wCc/FZa2Q9FKRqOI8eWSrnL+TjBO5tu4cS+I7LHZ1auzeufhVkZRoGTx4H9LXjvmu3j7lCsoZKlgNnt7n2Mg0sd17DwKpLdZHQuL2jqny7j3bDlRXVitwlaGu+b17x91y8CTAtrm0c2oFVOvrVLFiWLaMaQxpap19aZasS1bRjWDo08FPD1qkJshbTmJpzUVrkQGq1yE24J8hYOCO1yeCmHBNOC2HBNOClMcnLXcFtZIyW+qnjgj9ke7d4LRrJ6B5bDansn5Kmqn4IWF3hP1NbxJ1BWbm3m/HRR4R3Ur/8Aqy21+5buaPL5p8NXblCt1vbZWYfPqH3OynnkKgrr00LY2MjYMLY2hjG7mtFgOwJnKda2CGWd3exMc8jfYaAOJOjrW4q+5TMtDC2ijPdEiSotsaNLGnr7rqbvUtZax2c2iYM8Tu1++9V9LI5znOcbkuLnHe4m5PaUiRCMFuClSIShPCYlshdz81HihdfCifFR7V2cqxYaiZu6V/ZiNkw1q7OdFNgqXnZIGvHZY+Vp7VzGsWLtALZHDvKjRSX42u2gLAMTgYnWsTjWKOU4uTLWKX5DytzoEchtINAJ/eD71GgxZtajWa0Ogfeb4jb72qLaYmzNuu8DsU9WLmgixAIOsHSCo9QZbc0BswLhseO+6xt/5rXbp6lkguxwdw9kOkawtJBaop/kOOw5++8YKilgfGesMNupadRkOnfpwYTvjOEdmryLUfmxHse8dIB+5d9C59jgcalgrwTm2qZuTj6+qjZzVGybtjv9pIc1B7d83/cpKhD/AE6zdnzdzRPj7R2vIclGDmn/AJ/zf9yxOaH+f81/cpShJ+nWbs+buaX9RtHa8hyUTOZ3+eP9o/iWBzK/8j5r+5S9Cd+n2fs+buaX9TtPa8hyUNOY3/k/M/3pBmINtR2RW+2pmhOFigH7fM8079UtXa8m8lEGZiw+ymkPvWsb57rdpszqJli5j5SPbX3HY2wPWFIkIjbPE3JqG7SFpcKF58MPRM08DI2hkbWsaNTWANaOgBPLVq66KFuKWRkY2F7gL9A29Sh+XM+QAWUYJOrn5BYD3jTr6XdhT3Pa3NMs9kmtB6g8TlxXXzqzjZRRkCzp3D1OPWGjw3jYOG3tIqOplc9zpHkuc4lz3u1ucdZK2KmRz3Oe9xc8m7nuJLnHeStVwSNkqVrbDYmWVlBiTmdvcNgHnwpghKhSQphSIAJIA0kmwG8oXUzWozNW08ewyNkd71ndO8jSOtErTFDe+40vOqp4Yq1/zCzghdlCi4rCdK/auFnRRc5EJAO6jOn3h19hse1RZjFYjmgggi4IsQdRCiGUcnmKS3sHaYzw3dIVLpOz0PSjLI/Y/bgrOwWjq9EdWS0GsTjWLNrE41iqKKcXJsMTgYnAxZBi66hlyaDEoYngxLhS3U28smVkw1SO6zi86f8AzpMPZNPS0eha2FGFHbPM3J54nmhljHZtHALc/PM25nYfvSfn2XwY/lfetMsSFqf8XP2ykEUfZC3Dl2XwY+x33rA5em8GLsd+JaRYsHMXfGT9s+XJPEEXZC3TnDN4MXY/8SbOck3gxeK/8S0nMTLmLvjJ+2fLkiNghP7Qugc55/Bh7H/iTLs66nwYR8V/4lznsTL2J/xc5/cUZtmg7AW5LnVV7DG3oYPTdc2ry/Wv0GeRo9xhj8rQFhIxasjE4TyOzceKlxwQtyYOAWlM8uJc4lxOtziS49JKYcFtyNWu8KRGVNBWu4JlwT7gm3BT4ynhazkLJyxU9iUpVYHJfksjnaxw0W5iG+3UXu8jRfg5Q7IWSZKudsMeo6XvtdrGDW4+gbSQrpoKNkETIYxhZG0NaNthtJ2k6yeKV5woqTTFqDI+hGbs+4fn03rbQhCEswhM1NO2VpY8XB7Qd4TyEhAIockoJBqFFqugdEbHS32LxqP3FNhqlTmgixAIOsHSFz58lg6WHD7k6R2qltGjXNNYsRs1/n13qfHbARR644asw1bTqSRutp6dY8ibwqvdGWGjhTfgj3wck0GpcKdDVlhXXUhcmcKTCn8KMK66uvJgtWBatgtWJauupQ5a5asHNWyWptzUlE8OWq5qbc1bbmppzUiK1y0ntWu9i3ntTD2pUdrloSMWtIxb8jVqyNRGqS1y58rVpyNXTlatKVqlMKlMctJwTLwtlzTewFzsA1rbpc3qyfvIJCPCkbgZ4zrAqwixRXPawVcabzT1XFet3IuRp6yXm4W6PZSHEGMG8u9GsqZ5I5PNIdVyAj2qEnT0ud6B1qb0NFFAwRwsbGxuprBYX2k7zxKntNAqm1aYjYC2HrO26hz9N+S0c3shRUcXNs7pzrGWUizpHegDYNnTcnsIQkWZe9z3FzjUlCEIXJqEIQuXIQhC5chNz6kiEp+QpRmudMmUiFnZ81YNyQhCEFKkKQoQkTlgU2UqEic1NOTTkITUZqZemJEIXI7VrSrWkSoT2qQxaci2aHWlQptnzTpfkKnWQe86l1UIVy3JZWX5yhCEJyYhCELlyEIQuXL/2Q==',
          width: 32, height: 32
        }} />
      </TouchableOpacity>
    </Box>
  )
}