import React, { useState } from "react";
import { View, Text, FlatList, Modal, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { postComment } from "../features/comments/commentsSlice";

const CampsiteInfoScreen = ({ route }) => {
  const { campsiteId } = route.params;
  const campsites = useSelector((state) => state.campsites.campsitesArray);
  const comments = useSelector((state) => state.comments.commentsArray);
  const campsite = campsites.find((campsite) => campsite.id === campsiteId);
  const campsiteComments = comments.filter(
    (comment) => comment.campsiteId === campsiteId
  );

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const newComment = {
      author,
      rating,
      text,
      campsiteId: campsite.id,
    };
    dispatch(postComment(newComment));
    setShowModal(!showModal);
  };

  const resetForm = () => {
    setRating(5);
    setAuthor("");
    setText("");
  };

  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          imageSize={10}
          readonly
          startingValue={item.rating}
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
        />
        <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${new Date(
          item.date
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`}</Text>
      </View>
    );
  };

  return (
    <>
      <RenderCampsite
        campsite={campsite}
        onShowModal={() => setShowModal(!showModal)}
      />
      <FlatList
        data={campsiteComments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
          resetForm();
        }}
      >
        <View style={styles.modal}>
          <Rating
            showRating
            startingValue={rating}
            imageSize={40}
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
          />
          <Input
            placeholder="Author"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(author) => setAuthor(author)}
            value={author}
          />
          <Input
            placeholder="Comment"
            leftIcon={{ type: "font-awesome", name: "comment-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              color="#5637DD"
              onPress={() => {
                handleSubmit();
                resetForm();
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              title="Cancel"
              color="#808080"
              onPress={() => {
                setShowModal(!showModal);
                resetForm();
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default CampsiteInfoScreen;
