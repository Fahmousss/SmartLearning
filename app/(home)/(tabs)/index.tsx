import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Channel, ChannelAvatar, ChannelList, MessageInput, MessageList } from 'stream-chat-expo';
import { router } from 'expo-router';
import { useAuth } from '~/providers/AuthProvider';
import { supabase } from '~/lib/supabase';
import SearcInput from '~/components/SearcInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


export default function Main() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles } = await supabase.from('profiles').select('*').neq('id', user?.id); //Exclude current user
      setUsers(profiles);
    };
    fetchUsers();
  }, [user?.id]);

  return (
    <>
      <ChannelList
        filters={{
          members: { $in: [user?.id!] },
        }}
        onSelect={async (channel) => {
          router.push(`/channel/${channel.cid}`);
          let sort = { user_id: 'asc' };
        }}
        PreviewAvatar={({ channel }) => <ChannelAvatar channel={channel} />}
      />
    </>
  );
}
// Password chO4XOeEwziSCzix
