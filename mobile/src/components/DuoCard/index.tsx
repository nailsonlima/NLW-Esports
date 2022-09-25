import { TouchableOpacity, View, Text } from 'react-native';


import { Duoinfo } from '../Duoinfo';

import {GameController} from 'phosphor-react-native'
import { THEME } from '../../theme';



import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props{
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({data, onConnect} : Props) {
  return (
    <View style={styles.container}>
      <Duoinfo
      label='Nome'
      value={data.name}
      />
      <Duoinfo
      label='Tempo de Jogo'
      value={`${data.yearsPlaying} anos`}
      />
      <Duoinfo
      label='Disponibilidade'
      value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <Duoinfo
      label='Chamada de àudio'
      value={data.useVoiceChannel ? "SIM": "NÃO"}
      colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT }
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={onConnect}>
        <GameController
        color={THEME.COLORS.TEXT}
        size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}