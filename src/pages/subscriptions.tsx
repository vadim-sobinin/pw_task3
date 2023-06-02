import Subscriptions from '@/components/screens/subscriptions/Subscriptions';
import { NextPage } from 'next';
import { SubscribeType, codesType } from '@/types';
import { SubscribeService } from '@/services/subscribe.service';

type subPropsType = {
  subList: SubscribeType[];
  codeList: codesType[];
};

export async function getServerSideProps({ req }: any) {
  const token = String(req.cookies.key) || '';

  if (token === 'undefined') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const subscribe = await SubscribeService.getSubscribe(token);

  const codes = await SubscribeService.getCodes(token);
  return { props: { codeList: codes.data, subList: subscribe.data } };
}

const subscriptions: NextPage<subPropsType> = ({ subList, codeList }) => {
  // console.log(subList, codeList);
  return <Subscriptions subList={subList} codeList={codeList} />;
};

export default subscriptions;
