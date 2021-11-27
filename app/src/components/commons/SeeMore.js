import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, View, Modal, TouchableOpacity, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { API_URL } from "@env";

import { ProgressContext, ReadyContext } from "../../contexts";
import t from "../../utills/translate/Translator";

const ItemThreeDot = styled.TouchableOpacity`
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 15px;
  right: 20px;
  padding: 10px;
`;

const UpdateBtn = styled.TouchableOpacity`
  border: 1px;
  width: 80px;
  height: 30px;
  position: absolute;
  right: 20px;
  top: 45px;
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
  top: 75px;
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
}) => {
  const [isThreeDots, setIsThreeDots] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const _toggleIsThreeDots = () => {
    setIsThreeDots((isThreeDots) => !isThreeDots);
  };

  const _updateReply = () => {
    setIsUpdateReply(true);
    setUpdateModalVisible(false);
    setReplyNo(replyNo);
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

  const _updateComment = () => {
    setIsUpdateComment(true);
    setUpdateModalVisible(false);
    setCommentNo(commentNo);
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

  const _deleteMarket = async () => {
    try {
      spinner.start();
      // const id = await getItemFromAsync("id");
      // setIsId(id);

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
      readyDispatch.notReady();
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
      readyDispatch.notReady();
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

  let studentId = "123";
  let id = "123";

  const divideBtn = () => {
    if (divide === "Market") {
      return (
        <>
          {/* <UpdateBtn onPress={() => setUpdateModalVisible(true)}> */}
          <UpdateBtn
            onPress={() => Alert.alert(`${t.print("TheresNoFunctionYet")}`)}
          >
            <Text>{t.print("ToEdit")}</Text>
            <Modal
              animationType="fade"
              visible={updateModalVisible}
              transparent={true}
              onBackdropPress={() => setUpdateModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                        onPress={() => setUpdateModalVisible(false)}
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
                        onPress={_updateComment}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </View>
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
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                        onPress={() => setDeleteModalVisible(false)}
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
                        onPress={() => _deleteMarket()}
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
              </View>
            </Modal>
          </DeleteBtn>
        </>
      );
    } else if (divide === "Community") {
      return (
        <>
          {/* <UpdateBtn onPress={() => setUpdateModalVisible(true)}> */}
          <UpdateBtn
            onPress={() => Alert.alert(`${t.print("TheresNoFunctionYet")}`)}
          >
            <Text>{t.print("ToEdit")}</Text>
            <Modal
              animationType="fade"
              visible={updateModalVisible}
              transparent={true}
              onBackdropPress={() => setUpdateModalVisible(false)}
              backdropColor="black"
              hasBackdrop={true}
            >
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                        onPress={() => setUpdateModalVisible(false)}
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
                        onPress={_updateComment}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </View>
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
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                        onPress={() => setDeleteModalVisible(false)}
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
              </View>
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
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                        onPress={() => setUpdateModalVisible(false)}
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
                        onPress={_updateComment}
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
              </View>
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
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                          "AreYouSureYouWantToDeleteYourCommentAllIsDeletedAndCannotBeRecovered"
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
                        onPress={() => setDeleteModalVisible(false)}
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
              </View>
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
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                        onPress={() => setUpdateModalVisible(false)}
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
                        onPress={_updateReply}
                      >
                        <Text style={{ fontWeight: "bold", color: "#ffc352" }}>
                          {t.print("Yes")}
                        </Text>
                      </TouchableOpacity>
                    </ModalRowContainer>
                  </View>
                </View>
              </View>
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
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                          paddingBottom: 20,
                          paddingLeft: 20,
                          paddingRight: 20,
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
                        onPress={() => setDeleteModalVisible(false)}
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
              </View>
            </Modal>
          </DeleteBtn>
        </>
      );
    }
  };

  const _discriminateId = () => {
    if (studentId === id) {
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
