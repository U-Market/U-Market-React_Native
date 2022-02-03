import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { API_URL } from "@env";

import { ProgressContext } from "../../contexts";
import t from "../../utils/translate/Translator";

const ItemThreeDot = styled.TouchableOpacity`
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 10px;
`;

const UpdateBtn = styled.TouchableOpacity`
  border: 1px;
  width: 80px;
  height: 30px;
  position: absolute;
  right: 20px;
  top: 40px;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.label};
  justify-content: center;
  align-items: center;
`;

const DeleteBtn = styled.TouchableOpacity`
  border: 1px;
  width: 80px;
  height: 30px;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.label};

  position: absolute;
  right: 20px;
  top: 70px;
  justify-content: center;
  align-items: center;
`;

const ModalRowContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const ModalTextContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 5px;
  padding-bottom: 10px;
`;

const SeeMore = ({
  navigation,
  divide,
  communityNo,
  productNo,
  categoryNo,
  commentNo,
  setCommentNo,
  headerTitle,
  setIsUpdateComment,
  setIsReady,
  setComments,
  setIsUpdateReply,
  setIsReplyReady,
  setReplyNo,
  setReplies,
  replyNo,
  comment,
  userNo,
  writerNo,
}) => {
  const [isThreeDots, setIsThreeDots] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);

  const { spinner } = useContext(ProgressContext);

  const _toggleIsThreeDots = () => {
    setIsThreeDots((isThreeDots) => !isThreeDots);
  };

  const _updateReplyState = () => {
    setIsUpdateReply(true);
    setUpdateModalVisible(false);
    setIsThreeDots(false);
    setReplyNo(replyNo);
  };

  const _updateCommentState = () => {
    setIsUpdateComment(true);
    setIsThreeDots(false);
    setUpdateModalVisible(false);
    setCommentNo(commentNo);
  };

  const _updateMarketState = () => {
    navigation.navigate("MarketEditPage", {
      updateProductNo: productNo,
      isUpdate,
    });
    setUpdateModalVisible(false);
  };

  const _updateCommunityState = () => {
    navigation.navigate("CommunityEditPage", {
      updateCommunityNo: communityNo,
      isUpdate,
    });
    setUpdateModalVisible(false);
  };

  const pressUpdateNoBtn = () => {
    setIsThreeDots(false);
    setUpdateModalVisible(false);
  };

  const pressDeleteNoBtn = () => {
    setIsThreeDots(false);
    setUpdateModalVisible(false);
  };

  const _deleteReply = async () => {
    try {
      spinner.start();

      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentNo: comment.commentNo,
        }),
      };

      const response = await fetch(`${API_URL}/api/replies/${replyNo}`, config);
      setDeleteModalVisible(false);
      setReplies([]);
      setIsReplyReady(false);

      Alert.alert("삭제 성공하였습니다.");
    } catch (e) {
      console.log(e);
      Alert.alert("삭제 실패했습니다.");
    } finally {
      spinner.stop();
    }
  };

  const _deleteComment = async () => {
    try {
      spinner.start();

      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/comments/${commentNo}`,
        config
      );

      setDeleteModalVisible(false);
      setComments([]);
      setIsReady(false);
    } catch (e) {
      console.log(e);
      Alert.alert("Delete Failed");
    } finally {
      spinner.stop();
    }
  };

  const _deleteProduct = async () => {
    try {
      spinner.start();
      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/products/${productNo}`,
        config
      );

      setDeleteModalVisible(false);
      navigation.navigate("Main", {
        categoryNo: categoryNo,
        headerTitle: headerTitle,
      });
      Alert.alert("삭제 성공하였습니다.");
    } catch (e) {
      console.log(e);
      Alert.alert("Delete Failed");
    } finally {
      spinner.stop();
    }
  };

  const _deleteCommunity = async () => {
    try {
      spinner.start();
      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/communities/${communityNo}`,
        config
      );

      setDeleteModalVisible(false);

      navigation.navigate("Main", {
        categoryNo: categoryNo,
        headerTitle: headerTitle,
      });
    } catch (e) {
      console.log(e);
      Alert.alert("delete failed");
    } finally {
      spinner.stop();
    }
  };

  const divideBtn = () => {
    if (divide === "Market") {
      return (
        <>
          <UpdateBtn onPress={() => setUpdateModalVisible(true)}>
            <Text>{t.print("ToEdit")}</Text>
            <Modal
              animationType="fade"
              visible={updateModalVisible}
              transparent={true}
              onBackdropPress={() => setUpdateModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setUpdateModalVisible(false);
                    setIsThreeDots(false);
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      width: 300,
                      height: 150,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        paddingBottom: 10,
                      }}
                    >
                      <Text>{t.print("ToEdit")}</Text>
                    </Text>
                    <ModalTextContainer>
                      <Text style={{ color: "#666666" }}>
                        게시글을 수정하시겠습니까?
                      </Text>
                    </ModalTextContainer>
                    <ModalRowContainer>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          color: "#ffc352",
                          borderRightWidth: 1,
                          borderRightColor: "#c9c9c9",
                          padding: 5,
                        }}
                        onPress={pressUpdateNoBtn}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          padding: 5,
                        }}
                        onPress={_updateMarketState}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </UpdateBtn>
          <DeleteBtn onPress={() => setDeleteModalVisible(true)}>
            <Text>{t.print("Delete")}</Text>
            <Modal
              animationType="fade"
              visible={deleteModalVisible}
              transparent={true}
              onBackdropPress={() => setDeleteModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setDeleteModalVisible(false);
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      width: 300,
                      height: 160,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        paddingBottom: 10,
                      }}
                    >
                      {t.print("Delete")}
                    </Text>
                    <ModalTextContainer>
                      <Text
                        style={{
                          color: "#666666",
                        }}
                      >
                        {t.print(
                          "AreYouSureYouWantToDeleteThePostAllOfTheAboveWillBeDeletedAndCannotBeRecovered"
                        )}
                      </Text>
                    </ModalTextContainer>
                    <ModalRowContainer>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          color: "#ffc352",
                          borderRightWidth: 1,
                          borderRightColor: "#c9c9c9",
                          padding: 5,
                        }}
                        onPress={pressDeleteNoBtn}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          padding: 5,
                        }}
                        onPress={() => _deleteProduct()}
                      >
                        <ModalTextContainer>
                          <Text
                            style={{ fontWeight: "bold", color: "#ffc352" }}
                          >
                            {t.print("Yes")}
                          </Text>
                        </ModalTextContainer>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </DeleteBtn>
        </>
      );
    } else if (divide === "Community") {
      return (
        <>
          <UpdateBtn onPress={() => setUpdateModalVisible(true)}>
            <Text>{t.print("ToEdit")}</Text>
            <Modal
              animationType="fade"
              visible={updateModalVisible}
              transparent={true}
              onBackdropPress={() => setUpdateModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setUpdateModalVisible(false);
                    setIsThreeDots(false);
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      width: 300,
                      height: 150,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {t.print("ToEdit")}
                    </Text>
                    <ModalTextContainer>
                      <Text style={{ color: "#666666" }}>
                        게시글을 수정하시겠습니까?
                      </Text>
                    </ModalTextContainer>
                    <ModalRowContainer>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          color: "#ffc352",
                          borderRightWidth: 1,
                          borderRightColor: "#c9c9c9",
                          padding: 5,
                        }}
                        onPress={pressUpdateNoBtn}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          padding: 5,
                        }}
                        onPress={_updateCommunityState}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </UpdateBtn>
          <DeleteBtn onPress={() => setDeleteModalVisible(true)}>
            <Text>{t.print("Delete")}</Text>
            <Modal
              animationType="fade"
              visible={deleteModalVisible}
              transparent={true}
              onBackdropPress={() => setDeleteModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setDeleteModalVisible(false);
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      width: 300,
                      height: 160,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        paddingBottom: 10,
                      }}
                    >
                      {t.print("Delete")}
                    </Text>
                    <ModalTextContainer>
                      <Text
                        style={{
                          color: "#666666",
                        }}
                      >
                        {t.print(
                          "AreYouSureYouWantToDeleteThePostAllOfTheAboveWillBeDeletedAndCannotBeRecovered"
                        )}
                      </Text>
                    </ModalTextContainer>
                    <ModalRowContainer>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          color: "#ffc352",
                          borderRightWidth: 1,
                          borderRightColor: "#c9c9c9",
                        }}
                        onPress={pressDeleteNoBtn}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                        }}
                        onPress={() => _deleteCommunity()}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </DeleteBtn>
        </>
      );
    } else if (divide === "Comment") {
      //댓글
      return (
        <>
          <UpdateBtn onPress={() => setUpdateModalVisible(true)}>
            <Text>{t.print("ToEdit")}</Text>
            <Modal
              animationType="fade"
              visible={updateModalVisible}
              transparent={true}
              onBackdropPress={() => setUpdateModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setUpdateModalVisible(false);
                    setIsThreeDots(false);
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      width: 280,
                      height: 140,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        paddingBottom: 10,
                      }}
                    >
                      {t.print("ToEdit")}
                    </Text>
                    <ModalTextContainer>
                      <Text style={{ color: "#666666" }}>
                        {t.print(
                          "PleaseEnterTheContentToBeEditedInTheCommentBox"
                        )}
                      </Text>
                    </ModalTextContainer>
                    <ModalRowContainer>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          color: "#ffc352",
                          borderRightWidth: 1,
                          borderRightColor: "#c9c9c9",
                        }}
                        onPress={pressUpdateNoBtn}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                        }}
                        onPress={_updateCommentState}
                      >
                        <ModalTextContainer>
                          <Text
                            style={{ fontWeight: "bold", color: "#ffc352" }}
                          >
                            {t.print("Yes")}
                          </Text>
                        </ModalTextContainer>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </UpdateBtn>
          <DeleteBtn onPress={() => setDeleteModalVisible(true)}>
            <Text>{t.print("Delete")}</Text>
            <Modal
              animationType="fade"
              visible={deleteModalVisible}
              transparent={true}
              onBackdropPress={() => setDeleteModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setDeleteModalVisible(false);
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      width: 280,
                      height: 160,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        paddingBottom: 10,
                      }}
                    >
                      {t.print("Delete")}
                    </Text>
                    <ModalTextContainer>
                      <Text
                        style={{
                          color: "#666666",
                        }}
                      >
                        댓글을 삭제하시겠습니까?
                      </Text>
                      <Text
                        style={{
                          color: "#666666",
                        }}
                      >
                        삭제하시면 복구하실 수 없습니다.
                      </Text>
                    </ModalTextContainer>
                    <ModalRowContainer>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          color: "#ffc352",
                          borderRightWidth: 1,
                          borderRightColor: "#c9c9c9",
                        }}
                        onPress={pressDeleteNoBtn}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                        }}
                        onPress={() => _deleteComment()}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </DeleteBtn>
        </>
      );
    } else {
      return (
        <>
          <UpdateBtn onPress={() => setUpdateModalVisible(true)}>
            <Text>{t.print("ToEdit")}</Text>
            <Modal
              animationType="fade"
              visible={updateModalVisible}
              transparent={true}
              onBackdropPress={() => setUpdateModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setUpdateModalVisible(false);
                    setIsThreeDots(false);
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      width: 320,
                      height: 150,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        paddingBottom: 10,
                      }}
                    >
                      {t.print("ToEdit")}
                    </Text>
                    <ModalTextContainer>
                      <Text style={{ color: "#666666" }}>
                        {t.print(
                          "PleaseEnterTheContentToBeEditedInTheCommentBox"
                        )}
                      </Text>
                    </ModalTextContainer>
                    <ModalRowContainer>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          color: "#ffc352",
                          borderRightWidth: 1,
                          borderRightColor: "#c9c9c9",
                        }}
                        onPress={pressUpdateNoBtn}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                        }}
                        onPress={_updateReplyState}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </UpdateBtn>
          <DeleteBtn onPress={() => setDeleteModalVisible(true)}>
            <Text>{t.print("Delete")}</Text>
            <Modal
              animationType="fade"
              visible={deleteModalVisible}
              transparent={true}
              onBackdropPress={() => setDeleteModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setDeleteModalVisible(false);
                    setIsThreeDots(false);
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      width: 300,
                      height: 160,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        paddingBottom: 10,
                      }}
                    >
                      {t.print("Delete")}
                    </Text>
                    <ModalTextContainer>
                      <Text
                        style={{
                          color: "#666666",
                        }}
                      >
                        답글을 삭제하시겠습니까?
                      </Text>
                      <Text
                        style={{
                          color: "#666666",
                        }}
                      >
                        삭제하시면 복구하실 수 없습니다.
                      </Text>
                    </ModalTextContainer>
                    <ModalRowContainer>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                          color: "#ffc352",
                          borderRightWidth: 1,
                          borderRightColor: "#c9c9c9",
                        }}
                        onPress={pressDeleteNoBtn}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 150,
                          alignItems: "center",
                        }}
                        onPress={() => _deleteReply()}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </DeleteBtn>
        </>
      );
    }
  };

  const _discriminateId = () => {
    if (Number(userNo) === writerNo) {
      return <>{divideBtn()}</>;
    } else {
      return (
        <>
          <UpdateBtn>
            <Text>{t.print("ToBlock")}</Text>
          </UpdateBtn>
          <DeleteBtn>
            <Text>{t.print("ReportIt")}</Text>
          </DeleteBtn>
        </>
      );
    }
  };

  return (
    <>
      <ItemThreeDot onPress={_toggleIsThreeDots}>
        <Entypo name="dots-three-horizontal" size={24} color="grey" />
      </ItemThreeDot>
      {isThreeDots ? <>{_discriminateId()}</> : <></>}
    </>
  );
};

export default SeeMore;
