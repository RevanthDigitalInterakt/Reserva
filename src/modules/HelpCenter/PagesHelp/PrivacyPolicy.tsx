/* eslint-disable max-len */
import { useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Linking,
  SafeAreaView, ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

interface DataExplanationProps {
  origin: string;
  explanation: {
    dataCollect: {
      title: string;
      description: string;
    }[]
    goal: {
      title: string;
      description: string;
    }[]
  }[]
}

interface RightOfHoldersProps {
  title: string;
  description: string;
}

const { width } = Dimensions.get('window');

const dataExplanataion: DataExplanationProps[] = [
  {
    origin: 'Navegação no Site',
    explanation: [
      {
        dataCollect: [
          {
            title: 'Dados de navegação',
            description: 'dados coletados por meio de cookies ou device IDs, incluindo IP, data e hora de acesso, localização geográfica, tipo de navegador, duração da visita, páginas visitadas.',
          },
          {
            title: 'Dados sobre o dispositivo de acesso',
            description: 'modelo, fabricante, sistema operacional, operadora de telefonia, tipo de navegador, velocidade da conexão.',
          },
        ],
        goal: [
          {
            title: 'Registro de acesso',
            description: 'temos o dever legal de armazenar algumas de suas informações (como o seu IP, data e hora de acesso) para eventualmente fornecê-las a autoridades.',
          },
          {
            title: 'Cookies',
            description: 'ativar funcionalidades essenciais, gerar informações estatísticas para o aperfeiçoamento do Site e oferecer publicidade personalizada. Para mais informações, confira o item 2 desta Política.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Dados que você fornece em formulários nos sites',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome completo, e-mail, gênero',
          },
        ],
        goal: [
          {
            title: 'Cadastro no Site',
            description: 'quando você preencher o formulário de cadastro disponível em nosso Site, nós usaremos seus dados para cadastrar você no banco de dados da Ar&Co.',
          },
          {
            title: 'Comunicações e publicidade',
            description: 'usaremos tais dados também para envio de comunicações e publicidade. Tais comunicações poderão ser feitas por e-mail, telefone, WhatsApp, correspondência ou mala direta. Você pode se opor ao recebimento das mensagens publicitárias seguindo os procedimentos informados no item 5 desta Política e, no caso de e-mail marketing, clicando na opção correspondente ao final do e-mail enviado pela Ar&Co a você.',
          },
        ],
      },
      {
        dataCollect: [
          {
            title: '',
            description: 'E-mail',
          },
        ],
        goal: [
          {
            title: 'Newsletter',
            description: 'Caso você se cadastre em nossa newsletter, usaremos o seu e-mail para enviar a você os nossos lançamentos, novidades e promoções.',
          },
        ],
      },
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome completo, e-mail, telefone, CEP (o telefone será utilizado apenas caso você prefira o contato por este meio e o CEP caso você queira verificar se alguma loja próxima tem o produto em estoque).',
          },
        ],
        goal: [
          {
            title: 'Comunicação de disponibilidade',
            description: 'Quando um produto estiver indisponível no Site e você optar por ser avisado quando houver reposição do item em estoque, usaremos os dados indicados ao lado para comunicá-lo a esse respeito.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Cadastro nas lojas físicas',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome completo, e-mail, telefone, CPF, data de nascimento, endereço, gênero (obrigatórios).',
          },
        ],
        goal: [
          {
            title: 'Cadastro na loja física',
            description: 'antes de você realizar uma compra em nossas lojas físicas, poderemos solicitar esses dados para cadastrá-lo e poder oferecer serviços melhores e agilizar as suas compras futuras.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Pagamento da compra',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome completo, e-mail, telefone, CPF e dados bancários (número do cartão, nome do Titular do cartão, data de expiração do cartão e CVV).',
          },
        ],
        goal: [
          {
            title: 'Pagamento',
            description: 'usaremos esses dados para efetuar o pagamento de sua compra em nossos Sites. Os números de cartões de crédito fornecidos serão registrados diretamente no banco de dados das administradoras de cartão, de modo que a Ar&Co não acessa essas informações. Caso opte por salvar o cartão para compras futuras, os dados fornecidos serão gravados em um gateway de pagamento, uma empresa parceira que apresenta padrões de segurança adequados.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Entrega dos produtos',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome completo, telefone, endereço, CPF.',
          },
        ],
        goal: [
          {
            title: 'Entrega',
            description: 'usaremos esses dados para enviar, no endereço cadastrado, o(s) produto(s) adquirido(s) no Site, quando você escolher essa opção de entrega.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Atendimento (chat, e-mail, telefone, WhatsApp, mídias sociais, etc.)',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome completo, e-mail, telefone, CPF, endereço, data de nascimento, número do pedido.',
          },
        ],
        goal: [
          {
            title: 'Contato e atendimento',
            description: 'se você entrar em contato conosco por meio do chat do Site, e-mail, telefone, mídias sociais da Ar&Co ou sites como o Reclame Aqui, nós utilizaremos os dados indicados ao lado para atendê-lo.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Programa de fidelidade e cashback',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome completo, e-mail, telefone, CPF, data de nascimento, valor da compra.',
          },
        ],
        goal: [
          {
            title: 'Cashback',
            description: 'usaremos esses dados para devolver a você parte do valor da compra, como bônus, para que você possa usá-lo em outra compra da respectiva marca.',
          },
          {
            title: 'Programa de fidelidade',
            description: 'usaremos esses dados para que você possa receber benefícios (como cashback), resgatar em novos produtos e receber ofertas exclusivas.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Vale-Presente',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome, e-mail, telefone, CPF e endereço',
          },
        ],
        goal: [
          {
            title: 'Vale-Presente',
            description: 'usaremos os dados indicados ao lado caso você queira presentear alguém com um vale-presente de uma das marcas da Ar&Co ou receba um vale-presente.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Cadastro nas lojas físicas',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Nome completo, e-mail, telefone, CPF, data de nascimento, endereço, gênero (obrigatórios). Profissão, nome do pai, nome do cônjuge (opcionais).',
          },
        ],
        goal: [
          {
            title: 'Cadastro na loja física',
            description: 'antes de você realizar uma compra em nossas lojas físicas, solicitaremos esses dados para cadastrar você em nossos bancos de dados e processar a sua compra.',
          },
        ],
      },
    ],
  },
  {
    origin: 'Monitoramento das lojas físicas',
    explanation: [
      {
        dataCollect: [
          {
            title: '',
            description: 'Imagem',
          },
        ],
        goal: [
          {
            title: 'Monitoramento e segurança',
            description: 'usaremos a sua imagem para monitorá-lo e garantir a sua segurança em nossas lojas físicas.',
          },
        ],
      },
    ],
  },
];

const dataRightOfHolders: RightOfHoldersProps[] = [
  {
    title: 'Confirmação e Acesso',
    description: 'Permite que você possa verificar se tratamos dados pessoais seus e, em caso positivo, requisitar uma cópia dos dados pessoais que nós temos sobre você.',
  },
  {
    title: 'Correção',
    description: 'Permite que você solicite a correção dos seus dados pessoais incompletos, inexatos ou desatualizados.',
  },
  {
    title: 'Anonimização, bloqueio ou eliminação',
    description: 'Permite que você nos peça para (a) anonimizar seus dados, de forma que eles não possam mais ser relacionados a você e, portanto, deixem de ser dados pessoais; (b) bloquear seus dados, suspendendo temporariamente a possibilidade de os tratarmos; e (c) eliminar seus dados, caso em que apagaremos todos os seus dados sem possibilidade de reversão, salvo nos casos previstos em lei.',
  },
  {
    title: 'Portabilidade',
    description: 'Você tem o direito de solicitar, mediante requisição expressa, que seja fornecido a você ou a terceiro que você escolher, os seus dados pessoais em formato estruturado e interoperável, para transferência a outro fornecedor, desde que não viole a propriedade intelectual ou segredos de negócio das Ar&Co.',
  },
  {
    title: 'Informação sobre o compartilhamento',
    description: 'Você tem o direito de saber quais são as entidades públicas e privadas com quem realizamos o uso compartilhado de dados. Manteremos nessa Política a lista, sempre atualizada, dos tipos de parceiros com que compartilhamos os dados. Em todo caso, se você tiver dúvidas ou quiser maiores detalhes, você tem o direito de nos solicitar essas informações.',
  },
  {
    title: 'Informação sobre a possibilidade de não consentir',
    description: 'Permite que você tenha informações claras e completas sobre a possibilidade e as consequências de não fornecer o consentimento. O seu consentimento, quando necessário, deve ser livre e informado. Portanto, sempre que pedirmos seu consentimento, você será livre para negá-lo – ainda que, nesses casos, seja possível que tenhamos que limitar nossas entregas para você.',
  },
  {
    title: 'Revogação do consentimento',
    description: 'Você tem o direito de retirar o seu consentimento em relação às atividades de tratamento que se baseiam o consentimento. No entanto, isso não afetará a legalidade de qualquer tratamento realizado anteriormente. Se você retirar o seu consentimento, talvez não possamos fornecer determinadas comunicações ou serviços para você, mas iremos avisá-lo quando isso ocorrer.',
  },
  {
    title: 'Oposição',
    description: 'A lei autoriza o tratamento de dados pessoais mesmo sem o seu consentimento. Caso você não concorde com esse tratamento, você poderá se opor a ele em alguns casos, solicitando a interrupção.',
  },
];

type Props = StackScreenProps<RootStackParamList, 'HelpCenter'>;

export function PrivacyPolicy({ route }: Props) {
  const navigation = useNavigation();

  const navigateGoBack = () => {
    navigation.goBack();
    if (route?.params?.comeFrom === 'Menu') {
      navigation.navigate('Menu');
    }
  };

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <TopBarBackButton backButtonPress={() => navigateGoBack()} />

      <ScrollView>
        <Box flex={1} pt="xxxs" paddingX="xxxs">
          <Box mb="micro" left={-3}>
            <Typography variant="tituloSessoes">
              Política de Privacidade
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              A Ar&Co (Arezzo Indústria e Comércio S.A., empresa regularmente inscrita no CNPJ/MF sob nº.
              16.590.234/0001-76, com sede na Rua Fernandes Tourinho, nº 147, sala 402, Bairro Savassi,
              Belo Horizonte/MG, por sua filial, inscrita no CNPJ/MF sob o n° 16.590.234/0020-39), administradora dos sites das marcas da Ar&Co, respeita a sua privacidade e os princípios de proteção de dados pessoais, conforme a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados – LGPD). A presente Política de Privacidade (“Política”) visa que você, titular dos dados pessoais
              ("Titular"), tenha conhecimento de como a Ar&Co trata seus dados pessoais coletados no site, aplicativo ou loja de cada marca da Ar&Co. Você pode consultar as marcas do nosso grupo em
              <Typography style={{ textDecorationLine: 'underline', color: '#54a3e2' }} onPress={() => Linking.openURL('https://ri.arezzoco.com.br/')}> https://ri.arezzoco.com.br/.</Typography>
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              A Ar&Co poderá alterar, rever e atualizar a presente Política de Privacidade a qualquer momento. Recomendamos que consulte esta Política sempre que necessário para se manter informado sobre as formas como a Ar&Co trata e protege seus Dados Pessoais.
              Essa Política foi atualizada pela última vez em 10 de maio de 2022.
            </Typography>
          </Box>

          <Box
            mb="quarck"
          >
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={18}
            >
              1. Coleta e uso dos dados
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              Com o objetivo de oferecer nossos produtos, tornar a sua experiência melhor, cumprir com eventuais obrigações legais ou regulatórias, entre outras situações, a Ar&Co pode coletar alguns dos seus dados pessoais caso você interaja conosco. Na tabela abaixo, você pode encontrar alguns exemplos de quais são os dados coletados e para quais finalidades os utilizamos. Veja que, a depender de sua relação e interação conosco, diferentes tratamentos poderão ser
              realizados.
            </Typography>
          </Box>

          <Box
            mb="nano"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">a. Cliente: </Typography>
              Se você é um cliente, potencial ou efetivo, da Ar&Co, os seguintes dados sobre você poderão ser coletados, conforme o caso:
            </Typography>
          </Box>

          {dataExplanataion.map((data, i) => (
            <Box
              mb={dataExplanataion.length - 1 !== i ? 'nano' : 'xxs'}
            >
              <Box
                justifyContent="center"
                alignItems="center"
                backgroundColor="#8b8b8b"
                py="nano"
                px="xxxs"
                borderWidth={1}
                borderColor="#8b8b8b"
              >
                <Typography
                  fontFamily="nunitoBold"
                  color="white"
                  fontSize={16}
                  textAlign="center"
                >
                  Origem:
                  {' '}
                  {data.origin}
                </Typography>
              </Box>

              {data.explanation.map((explanation) => (
                <Box
                  p="nano"
                  borderWidth={1}
                  borderColor="preto"
                  borderTopWidth={0}
                >
                  <Box
                    mb="quarck"
                  >
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize={15}
                    >
                      - Dados Coletados
                    </Typography>
                  </Box>

                  {explanation.dataCollect.map((collect) => (
                    <Box
                      mb="xxs"
                    >
                      <Typography
                        fontFamily="nunitoRegular"
                        fontSize={15}
                        color="#707070"
                      >
                        <Typography style={{ fontStyle: 'italic' }}>{collect.title !== '' ? `${collect.title}: ` : ''}</Typography>
                        {collect.description}
                      </Typography>
                    </Box>
                  ))}

                  <Box
                    mb="quarck"
                  >
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize={15}
                    >
                      - Finalidade:
                    </Typography>
                  </Box>

                  {explanation.goal.map((goal, j) => (
                    <Box
                      mb={j !== explanation.goal.length - 1 ? 'xxs' : 'quarck'}
                    >
                      <Typography
                        fontFamily="nunitoRegular"
                        fontSize={15}
                        color="#707070"
                      >
                        <Typography style={{ fontStyle: 'italic' }}>{goal.title !== '' ? `${goal.title}: ` : ''}</Typography>
                        {goal.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))}

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">b. Franqueado: </Typography>
              Caso você queira se tornar um dos nossos franqueados, você pode manifestar seu interesse enviando alguns dados, como nome, e-mail, marca de interesse, faixas de capital, estado/cidade, idade, profissão, entre outros para que possamos avaliar seu perfil inicialmente e entrar em contato.
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">c. Venda corporativa: </Typography>
              Caso você tenha uma loja multimarcas e queira revender nossos produtos, você pode manifestar seu interesse enviando dados como o nome da sua empresa, seu nome, e-mail e telefone para que possamos entrar em contato.
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">d. ZZ'Influencer: </Typography>
              Caso você queira ser parceira(o) da Ar&Co para vender nossos produtos na sua Loja ZZ MALL, alguns dados como nome, e-mail, telefone
              e perfil de usuário nas redes sociais serão solicitados para que possamos analisar seu cadastro para criação de loja. Além disso, seus dados de contato podem ser utilizados para envio de mensagens e e-mail com informações sobre as novidades da Ar&Co.
              {'\n'}
              {'\n'}
              A Ar&Co não coleta, armazena ou trata, de outra forma, intencionalmente dados pessoais desnecessários ou excessivos para a prestação dos serviços. Em razão disso, pedimos que você se abstenha de compartilhar dados sensíveis conosco, como por exemplo, aqueles relativos à sua origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou à organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual e dado genético.
              {'\n'}
              {'\n'}
              A Ar&Co conta com marcas com produtos destinados a crianças e adolescentes. No entanto, não tratamos dados de Titulares menores sem o consentimento dado por pelo menos um responsável legal.
            </Typography>
          </Box>

          <Box
            mb="quarck"
          >
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={18}
            >
              2. Cookies
            </Typography>
          </Box>

          <Box
            p="micro"
            borderWidth={1}
            borderColor="preto"
            mb="quarck"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              Cookies são pequenos arquivos que são instalados e coletam informações sobre seu navegador ou dispositivo. Eles nos permitem saber como e quando o Site é visitado, bem como quantas pessoas o acessam. Eles podem ser úteis para, por exemplo, fazermos o Site encaixar na sua tela, entender melhor as suas preferências e lhe oferecer produtos por meio de campanhas segmentadas.
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              A Ar&Co utiliza os cookies para algumas finalidades, conforme indicado abaixo:
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">- Cookies essenciais: </Typography>
              são os cookies estritamente necessários para fornecer nossos produtos e serviços e para que o nosso Site funcione corretamente, garantindo a segurança da navegação, o correto dimensionamento do conteúdo no Site e o cumprimento de obrigações legais da Ar&Co.
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">- Cookies de publicidade: </Typography>
              usados para direcionamento de conteúdos e publicidade conforme o seu perfil e preferências. Eles servem para que você veja anúncios mais relevantes e mais interessantes durante a sua navegação.
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">- Cookies estatísticos (analytics): </Typography>
              fornecem informações sobre seu comportamento de navegação e como o Site está sendo usado. Os dados coletados são agregados, e nosso objetivo é entender melhor o nosso público, para que possamos oferecer conteúdo, serviços e produtos mais interessantes para quem acessa nosso Site.
              {'\n'}
              {'\n'}
              Se você quiser saber de forma geral quais cookies estão instalados no seu dispositivo, ou se deseja excluí-los ou restringi-los, use a configuração do seu navegador. Você encontrará mais explicações sobre como proceder clicando nos links abaixo. Para encontrar informações relacionadas a outros navegadores, visite o site do desenvolvedor do navegador.
            </Typography>
          </Box>

          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            mb="micro"
          >
            <TouchableOpacity
              onPress={() => Linking.openURL('https://support.mozilla.org/pt-BR/kb/limpe-cookies-e-dados-de-sites-no-firefox')}
            >
              <Box
                width={182}
                height={39}
                borderWidth={1}
                borderColor="preto"
                alignItems="center"
                justifyContent="center"
                style={{
                  marginBottom: width - (182 * 2) - (15 * 2),
                }}
              >
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={15}
                  color="#707070"
                >
                  Firefox
                </Typography>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://support.apple.com/pt-br/guide/safari/sfri11471/mac')}
            >
              <Box
                width={182}
                height={39}
                borderWidth={1}
                borderColor="preto"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={15}
                  color="#707070"
                >
                  Safari
                </Typography>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=pt-BR')}
            >
              <Box
                width={182}
                height={39}
                borderWidth={1}
                borderColor="preto"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={15}
                  color="#707070"
                >
                  Chrome
                </Typography>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://support.microsoft.com/pt-br/help/278835/how-to-delete-cookie-files-in-internet-explorer')}
            >
              <Box
                width={182}
                height={39}
                borderWidth={1}
                borderColor="preto"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={15}
                  color="#707070"
                >
                  Int. Explorer ou Edge
                </Typography>
              </Box>
            </TouchableOpacity>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              Se você quiser saber de forma geral quais cookies estão instalados no seu dispositivo, ou se deseja excluí-los ou restringi-los, use a configuração do seu navegador. Você encontrará mais explicações sobre como proceder clicando nos links abaixo. Para encontrar informações relacionadas a outros navegadores, visite o site do desenvolvedor do navegador.
            </Typography>
          </Box>

          <Box
            mb="quarck"
          >
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={18}
            >
              3. Compartilhamento de Dados
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              Para oferecermos nossos produtos e serviços da melhor forma possível, contamos com o apoio de outras empresas em nossas operações. Assim, em alguns casos, precisamos compartilhar dados com terceiros, como descrevemos abaixo:
            </Typography>
          </Box>

          <Box
            p="micro"
            borderWidth={1}
            borderColor="preto"
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="#707070">Ar&Co. </Typography>
              Suas informações podem ser compartilhadas entre as empresas pertencentes
              à Ar&Co, as quais estão de acordo com esta Política de Privacidade. Fazemos isso para, primordialmente, analisar dados e entender o seu perfil, de forma a lhe proporcionar experiências personalizadas e aderentes ao seu perfil, entre outros.
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="#707070">Fornecedores e parceiros. </Typography>
              Contamos com a ajuda de fornecedores e parceiros que podem tratar dados pessoais. As informações são compartilhadas apenas para as finalidades dos serviços prestados. Sempre buscamos avaliar nossos fornecedores e parceiros e firmar com eles obrigações contratuais de proteção de dados pessoais, com o objetivo de minimizar riscos para os Titulares. Entre esses fornecedores e parceiros, estão, por exemplo, agências de publicidade, empresas de logística, gateways de pagamento, bem como empresas que nos auxiliam com o cadastro, criação e gestão da Loja ZZ MALL – no caso de ZZ'Influencer.
            </Typography>
          </Box>

          <Box
            p="micro"
            borderWidth={1}
            borderColor="preto"
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="#707070">Autoridades Públicas. </Typography>
              Seus dados podem ser compartilhados com autoridades públicas para que cumpramos com a legislação vigente. Caso um juiz ou uma autoridade com competência legal exija que compartilhemos certos dados pessoais para, por exemplo, uma investigação, temos o dever de compartilhar. Somos contra qualquer abuso de autoridade e, caso entendamos que determinada ordem é abusiva, vamos sempre defender a privacidade dos Titulares.
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="#707070">Proteção de direitos. </Typography>
              Reservamo-nos o direito de compartilhar quaisquer dados pessoais que acreditarmos serem necessários para cumprir uma obrigação legal ou proteger os nossos direitos, dos nossos colaboradores e de terceiros.
            </Typography>
          </Box>

          <Box
            p="micro"
            borderWidth={1}
            borderColor="preto"
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="#707070">Outros países. </Typography>
              A Ar&Co poderá transferir seus dados para outros países como, por exemplo,
              para fins de armazenamento, no caso de servidores localizados no exterior. Firmamos com os terceiros que recebem esses dados obrigações contratuais robustas para proteger os dados
              pessoais e garantir a privacidade dos Titulares.
            </Typography>
          </Box>

          <Box
            mb="quarck"
          >
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={18}
            >
              4. Armazenamento de Dados
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              A Ar&Co observa regras internas próprias de retenção e descarte de dados pessoais e tem um documento que define as diretrizes para determinar o período de retenção adequado para cada tipo de dado pessoal coletado, considerando a sua natureza, necessidade de coleta e finalidade para a qual ele será tratado. Dados pessoais são armazenados somente pelo tempo que for necessário para cumprir com as finalidades para as quais foram coletados, salvo se houver qualquer outra razão para sua manutenção como, por exemplo, cumprimento de quaisquer obrigações legais, regulatórias, contratuais, entre outras. O Titular tem o direito de solicitar a exclusão dos seus dados (conforme disposto no item 6 desta Política), solicitação que será atendida quando não houver motivo para mantê-los.
            </Typography>
          </Box>

          <Box
            mb="quarck"
          >
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={18}
            >
              5. Segurança dos Dados
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              A Ar&Co respeita o sigilo e a segurança de suas informações. Por isso, conta com o certificado
              de segurança Secure Sockets Layer (“SSL”) Pro SGC emitido pela GMO GlobalSign, uma das maiores autoridades certificadoras do mundo. Por meio dele, todas as informações fornecidas pelo Titular em nosso Site são criptografadas e mantidas em sigilo em servidores seguros. Além isso, a Ar&Co adota práticas de segurança e governança adequadas para garantir a sua privacidade e a proteção dos seus dados.
              Ainda assim, você deve estar ciente de que as medidas de segurança relativas à internet não são infalíveis. Você pode nos ajudar a manter um ambiente seguro para todos adotando boas práticas de segurança em relação à sua conta e aos seus dados, como abaixo descrito.
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">a. Cuidados do Titular: </Typography>
              Recomendamos que você sempre se mantenha atento para proteger as suas informações, de modo que não sejam utilizadas senhas fáceis e óbvias e que estas não sejam compartilhadas
              com terceiros. Ao utilizar o Site em dispositivos públicos, é sempre importante certificar-se de que a sua sessão foi encerrada. Além disso, é muito importante sempre utilizar softwares originais e mantê-los atualizados, principalmente, programas de antivírus – para evitar riscos de invasões nos dispositivos
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">b. Quedas do sistema do Titular: </Typography>
              A Ar&Co não se responsabiliza por compras que não forem efetuadas nos canais oficiais da Companhia ou por problemas ocasionados por queda em sua rede de navegação.
              A premissa para realizar uma compra pelo Site é ter uma conexão bem-sucedida com a internet.
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">c. Fraudes em boleto: </Typography>
              Existe a possibilidade de um Titular ser impactado por um vírus instalado em seu dispositivo, vírus este que pode alterar os dados do boleto. Portanto, a Ar&Co recomenda que o Titular
              sempre verifique os dados do boleto – especialmente, os valores e o código do banco. Caso fique com dúvidas, entre em contato conosco por meio de nossa Central de Atendimento, disponível no Site. A Ar&Co não se responsabiliza por situações de fraudes causadas por terceiros.
            </Typography>
          </Box>

          <Box
            mb="quarck"
          >
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={18}
            >
              6. Direitos dos Titulares
            </Typography>
          </Box>

          <Box
            mb="xxxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              Conforme dispõe a legislação você tem alguns direitos relativos aos dados que tratamos.
              Abaixo, trazemos uma lista contendo todos esses direitos, além de informações a respeito de como você
              pode exercê-los. Ao recebermos a sua solicitação, é possível que precisemos verificar sua identidade antes de atendermos a sua requisição. Esta verificação pode incluir a solicitação de dados adicionais para garantir sua correta identificação. Ainda, quando indicar algum terceiro para fazer solicitações em seu nome, tal terceiro deverá apresentar um documento indicando
              que pode agir em seu nome, como uma procuração assinada por você.
              Para exercer quaisquer desses direitos, você pode entrar em contato conosco pelo e-mail informado no item 7 desta Política.
            </Typography>
          </Box>

          {dataRightOfHolders.map((item, i) => (
            <Box
              mb={dataRightOfHolders.length - 1 !== i ? 'nano' : 'xxs'}
            >
              <Box
                justifyContent="center"
                alignItems="center"
                backgroundColor="#8b8b8b"
                py="nano"
                px="xxxs"
                borderWidth={1}
                borderColor="#8b8b8b"
              >
                <Typography
                  fontFamily="nunitoBold"
                  color="white"
                  fontSize={16}
                  textAlign="center"
                >
                  {item.title}
                </Typography>
              </Box>

              <Box
                p="micro"
                borderWidth={1}
                borderColor="preto"
                borderTopWidth={0}
              >
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={15}
                  color="#707070"
                >
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}

          <Box
            mb="quarck"
          >
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={18}
            >
              7. Direitos dos Titulares
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              Se você tiver qualquer dúvida, comentário ou solicitação em relação aos seus dados pessoais,
              por favor, entre em contato com o nosso
              Encarregado pelo tratamento de dados pessoais, abaixo identificado:
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">- Encarregado: </Typography>
              Baptista Luz Advogados
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">- Endereço para correspondências: </Typography>
              Rua Ramos Batista, 444, 2° Andar, Vila Olímpia, São Paulo/SP, Brasil, CEP 04552-020.
            </Typography>
          </Box>

          <Box
            mb="xxs"
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="#707070"
            >
              <Typography fontFamily="nunitoBold" color="preto">- E-mail para contato: </Typography>
              privacidade@arezzo.com.br
            </Typography>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
