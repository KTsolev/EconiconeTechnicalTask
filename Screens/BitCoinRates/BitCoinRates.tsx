import React, {FunctionComponent, useRef, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {BitCoinRatesModel} from './Models/BitCoinReateModle';
import moment from 'moment';
import {styles} from './styles';
import * as Strings from './Strings';

export const BitCoinRates: FunctionComponent<
  BitCoinRates
> = (): JSX.Element => {
  const [serverState, setServerState] = useState(Strings.loadingState);
  const [serverData, setServerData] = useState<BitCoinRatesModel>();

  var ws = useRef(new WebSocket('wss://ws-feed.pro.coinbase.com')).current;

  useEffect(() => {
    ws.onopen = () => {
      setServerState(Strings.connectedToWS);
      submitMessage();
    };
    ws.onerror = e => {
      console.log(e.message);
      setServerState(e.message);
    };
    ws.onclose = () => {
      setServerState(Strings.disconectedToWS);
    };
    ws.onmessage = e => {
      const jsonData = JSON.parse(e.data);
      setServerData(
        new BitCoinRatesModel(
          jsonData.type,
          jsonData.trade_id,
          jsonData.maker_order_id,
          jsonData.taker_order_id,
          jsonData.side,
          jsonData.size,
          jsonData.sequence,
          jsonData.time,
        ),
      );
    };
    return () => ws.close();
  }, []);

  const submitMessage = () => {
    ws.send(
      JSON.stringify({
        type: 'subscribe',
        product_ids: ['BTC-USD'],
        channels: ['matches'],
      }),
    );
  };
  return (
    <View style={styles.container}>
      <Text
        testID="serverStatus"
        style={[
          styles.text,
          serverState === Strings.connectedToWS ? styles.success : styles.error,
        ]}>
        {serverState}
      </Text>
      {serverData && (
        <>
          <Text style={styles.text}>
            {Strings.type}
            {serverData?.type}
          </Text>
          <Text style={styles.text}>
            {Strings.tradeId} {serverData?.trade_id}
          </Text>
          <Text style={styles.text}>
            {Strings.makerOrderId} {serverData?.maker_order_id}
          </Text>
          <Text style={styles.text}>
            {Strings.takerOrderId} {serverData?.taker_order_id}
          </Text>
          <Text style={styles.text}>
            {Strings.side} {serverData?.side}
          </Text>
          <Text style={styles.text}>
            {Strings.size} {serverData?.size}
          </Text>
          <Text style={styles.text}>
            {Strings.sequence} {serverData?.sequence}
          </Text>
          <Text style={styles.text}>
            {Strings.date}
            {moment(serverData?.time).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </>
      )}
    </View>
  );
};

type BitCoinRates = {};
