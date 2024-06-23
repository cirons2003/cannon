import { Flex, HStack, Heading, Spinner } from "native-base";

type LoadingProps = {
    loadingMessage?: string;
    absolute?: boolean;
};

export const Loading = (props: LoadingProps) => {
    const { loadingMessage, absolute } = props;
    return (
        <Flex position={absolute ? 'absolute' : undefined} direction="row" flex={1} justify="center" align="center" top = {0} left={0} width='full' height='full'>
            <Spinner color="secondary" accessibilityLabel="Loading posts" />
            <Heading color="secondary" ml='sm' fontSize="md">
                {loadingMessage ? loadingMessage : 'Loading'}
            </Heading>
        </Flex>
    );
}