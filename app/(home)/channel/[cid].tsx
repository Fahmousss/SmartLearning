import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Channel as ChannelType } from 'stream-chat';
import { MessageInput, useChatContext } from 'stream-chat-expo';
import { MessageList } from 'stream-chat-expo';
import { Channel } from 'stream-chat-expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import HeaderRight from '~/components/HeaderRight';

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      setChannel(channels[0]);
    };
    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: channel.data?.name ? channel.data.name : 'Chat',
          headerBackTitleVisible: false,
          headerRight: () => {
            return (
              <HeaderRight>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setModalVisible(true)}
                  className=' gap-1 flex flex-row'>
                  <Ionicons
                    name="information-circle"
                    size={20}
                  />
                  <Text>Info Kontak</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                  await channel.delete();
                  router.push('/(home)');
                }}
                  style={styles.menuItem}
                  className=' gap-1 flex flex-row'>
                  <Ionicons
                    name="trash"
                    color={'red'}
                    size={20}
                  />
                  <Text className='text-red-400'>Delete</Text>
                </TouchableOpacity>
              </HeaderRight >
            );
          },
        }}
      />
      <Channel channel={channel} >
        <MessageList
          TypingIndicator={() => {
            return <Text>Typing...</Text>;
          }}
        />
        <SafeAreaView edges={['bottom']}>
          <MessageInput />
        </SafeAreaView>
      </Channel >

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Tutup modal saat pengguna tekan tombol kembali
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Info Kontak</Text>
            <Text style={styles.modalText}>
              Nama Channel: {channel.data?.name || 'Tidak diketahui'}
            </Text>
            <Text style={styles.modalText}>
              ID Channel: {channel.id || 'Tidak tersedia'}
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // Tutup modal
            >
              <Text style={styles.closeButtonText}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 8,
    alignItems: 'center',
  },
  // modalOverlay: {
  //   flex: 1,
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Latar belakang transparan gelap
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // modalContent: {
  //   width: '80%',
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 20,
  //   // alignItems: 'center',
  // },
  // modalTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 15,
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  // },
  // modalText: {
  //   fontSize: 16,
  //   marginBottom: 10,
  // },
  // closeButton: {
  //   marginTop: 15,
  //   backgroundColor: '#3470A2',
  //   padding: 10,
  //   borderRadius: 5,
  //   alignSelf: 'center',
  // },
  // closeButtonText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
})