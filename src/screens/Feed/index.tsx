import React, { useEffect, useState } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import Post from "../../models/Post";
import PostItem from "../components/PostItem";
import Header from "../components/Header";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { styles } from "./styles";
import { getPost } from "../../api/requests/post/get";

function Feed() {
  const { theme } = useTheme();
  const { authData } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
<<<<<<< HEAD
      const response = await getPost(authData?.token || "");
      setPosts(response);
=======
      const response = await get(authData?.token || "");
      const sortedPosts = response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(sortedPosts);
>>>>>>> ffed515f1717898be03919105e274631fe81626e
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const sharePost = async (title: string, content: string) => {
    try {
      const shareMessage = `${title}\n\n${content}`;
      const fileUri = FileSystem.cacheDirectory + "post.txt";

      await FileSystem.writeAsStringAsync(fileUri, shareMessage);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header title="Publicações" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem post={item} sharePost={sharePost} />
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
        }
      />
    </View>
  );
}

export default Feed;
