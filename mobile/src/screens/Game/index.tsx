import { useState ,useEffect } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import { Background } from '../../components/Background';
import {Entypo} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from './../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  
  const [duos, setDuos] = useState()
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  function handleGoBack(){
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    await fetch(`http://10.0.0.105:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }

useEffect(() => {
    fetch(`http://10.0.0.105:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  },[])


  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
           <TouchableOpacity  onPress={handleGoBack}>
              <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
              />  
            </TouchableOpacity> 
            <Image
            source={logoImg}
            style={styles.logo}
            />
            <View style={styles.right}/>
          </View>
          <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
          />
          
          <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
          />
          <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard 
            data={item} 
            onConnect={()=>getDiscordUser(item.id)}
            />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={()=>(
            <Text style={styles.emptyListText}>Não há anúncios publicados ainda</Text>
          )}
          />
          

          <DuoMatch
            onClose={()=>setDiscordDuoSelected('')}
            visible={discordDuoSelected.length > 0}
            discord={discordDuoSelected}
          />
        </SafeAreaView>
    </Background>
  );
}