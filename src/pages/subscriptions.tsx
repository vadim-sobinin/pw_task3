import Subscriptions from '@/components/screens/subscriptions/Subscriptions';
import { NextPage } from 'next';
import { SubscribeType } from '@/types';
import { SubscribeService } from '@/services/subscribe.service';

type subPropsType = {
    subList: SubscribeType[];
};

export async function getServerSideProps({ req }: any) {
    const token = String(req.cookies.key) || '';

    const subscribe = await SubscribeService.getSubscribe(token);

    return { props: { subList: subscribe.data } };
}

const subscriptions: NextPage<subPropsType> = ({ subList }) => {
    return <Subscriptions subList={subList} />;
};

export default subscriptions;
