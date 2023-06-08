import Subscriptions from '@/components/screens/subscriptions/Subscriptions';
import { NextPage } from 'next';
import { SubscribeType, codesType } from '@/types';
import { SubscribeService } from '@/services/subscribe.service';

type subPropsType = {
  subListData: SubscribeType[];
  codeListData: codesType[];
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
  return { props: { codeListData: codes.data, subListData: subscribe.data } };
}

const subscriptions: NextPage<subPropsType> = ({ subListData, codeListData }) => {
  // console.log(subList, codeList);
  return <Subscriptions subListData={subListData} codeListData={codeListData} />;
};

export default subscriptions;
