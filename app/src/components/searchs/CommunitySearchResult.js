import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert, View, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import t from "../../utills/translate/Translator";
import ComunitySearchTreeItem from "./ComunitySearchTreeItem";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background2};
`;

const Title = styled.Text`
  padding: 10px 10px 0px 10px;
  font-weight: bold;
  font-size: 16px;
`;
const SeeMoreContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  height: 40px;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  flex-direction: row;
`;
const SeeMore = styled.Text`
  color: ${({ theme }) => theme.mainOrange};
  font-size: 16px;
  padding-right: 3px;
`;

function CommunitySearchResult({ navigation, searchList, headerTitle }) {
  const [free, setFree] = useState(free);

  const showTreeSearchResultFree = () => {
    const spliceList = searchList.free.slice(0, 3);
    const Items = spliceList.map((community) => {
      return (
        <ComunitySearchTreeItem
          key={community.no}
          thumbnail={community.thumbnail}
          title={community.title}
          description={community.description}
          commentCnt={community.commentCount}
          hit={community.hit}
          likeCnt={community.likeCnt}
          inDate={community.inDate}
          nickname={community.nickname}
          no={community.no}
          navigation={navigation}
          profileUrl={community.profileUrl}
          categoryNo={community.categoryNo}
          headerTitle={headerTitle}
        />
      );
    });

    return Items;
  };

  const showTreeSearchResultPromotion = () => {
    const spliceList = searchList.promotion.slice(0, 3);
    const Items = spliceList.map((community) => {
      return (
        <ComunitySearchTreeItem
          key={community.no}
          thumbnail={community.thumbnail}
          title={community.title}
          description={community.description}
          commentCnt={community.commentCount}
          hit={community.hit}
          likeCnt={community.likeCnt}
          inDate={community.inDate}
          nickname={community.nickname}
          no={community.no}
          navigation={navigation}
          profileUrl={community.profileUrl}
          categoryNo={community.categoryNo}
          headerTitle={headerTitle}
        />
      );
    });

    return Items;
  };

  const showTreeSearchResultForAlone = () => {
    const spliceList = searchList.forAlone.slice(0, 3);
    const Items = spliceList.map((community) => {
      return (
        <ComunitySearchTreeItem
          key={community.no}
          thumbnail={community.thumbnail}
          title={community.title}
          description={community.description}
          commentCnt={community.commentCount}
          hit={community.hit}
          likeCnt={community.likeCnt}
          inDate={community.inDate}
          nickname={community.nickname}
          no={community.no}
          navigation={navigation}
          profileUrl={community.profileUrl}
          categoryNo={community.categoryNo}
          headerTitle={headerTitle}
        />
      );
    });

    return Items;
  };

  const showTreeSearchResultQuestion = () => {
    const spliceList = searchList.question.slice(0, 3);
    const Items = spliceList.map((community) => {
      return (
        <ComunitySearchTreeItem
          key={community.no}
          thumbnail={community.thumbnail}
          title={community.title}
          description={community.description}
          commentCnt={community.commentCount}
          hit={community.hit}
          likeCnt={community.likeCnt}
          inDate={community.inDate}
          nickname={community.nickname}
          no={community.no}
          navigation={navigation}
          profileUrl={community.profileUrl}
          categoryNo={community.categoryNo}
          headerTitle={headerTitle}
        />
      );
    });

    return Items;
  };

  return (
    <ScrollView>
      <Container>
        <Title>
          {t.print("ForFree")}({searchList.freeCount})
        </Title>

        <>{showTreeSearchResultFree()}</>
        <SeeMoreContainer
          onPress={() => {
            navigation.navigate("SearchSeeMorePage", {
              headerTitle: `${t.print("ForFree")} ${headerTitle} `,
              communities: searchList.free,
            });
          }}
        >
          <SeeMore>더보기</SeeMore>
          <AntDesign name="plus" size={18} color="#FFAE52" />
        </SeeMoreContainer>
        <Title>
          {t.print("ForLivingAlone")}({searchList.forAloneCount})
        </Title>
        <>{showTreeSearchResultForAlone()}</>
        <SeeMoreContainer
          onPress={() => {
            navigation.navigate("SearchSeeMorePage", {
              headerTitle: `${t.print("ForLivingAlone")} ${headerTitle} `,
              communities: searchList.forAlone,
            });
          }}
        >
          <SeeMore>더보기</SeeMore>
          <AntDesign name="plus" size={18} color="#FFAE52" />
        </SeeMoreContainer>
        <Title>
          {t.print("ForPromotion")}({searchList.promotionCount})
        </Title>
        <>{showTreeSearchResultPromotion()}</>
        <SeeMoreContainer
          onPress={() => {
            navigation.navigate("SearchSeeMorePage", {
              headerTitle: `${t.print("ForPromotion")} ${headerTitle} `,
              communities: searchList.promotion,
            });
          }}
        >
          <SeeMore>더보기</SeeMore>
          <AntDesign name="plus" size={18} color="#FFAE52" />
        </SeeMoreContainer>
        <Title>
          {t.print("QNA")}({searchList.questionCount})
        </Title>
        <>{showTreeSearchResultQuestion()}</>
        <SeeMoreContainer
          onPress={() => {
            navigation.navigate("SearchSeeMorePage", {
              headerTitle: `${t.print("QNA")} ${headerTitle} `,
              communities: searchList.question,
            });
          }}
        >
          <SeeMore>더보기</SeeMore>
          <AntDesign name="plus" size={18} color="#FFAE52" />
        </SeeMoreContainer>
      </Container>
    </ScrollView>
  );
}

export default CommunitySearchResult;
