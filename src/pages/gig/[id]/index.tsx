import { Box, Title } from '@mantine/core';
import React from 'react';
import GigCard from '../../../components/gig/card';
import Loading from '../../../components/loading';
import SignupList from '../../../components/signup-list';
import { useRouter } from 'next/router';
import { trpc } from '../../../utils/trpc';

const LIST_WIDTH = "800px";

const WhosComing = () => {
  const router = useRouter();
  const gigId = router.query.id as string;

  const { data: gig, status: gigStatus } =
    trpc.gig.getWithId.useQuery({ gigId }, { enabled: !!router.isReady });

  const loading = gigStatus === "loading";

  return (
    <Box sx={{ maxWidth: LIST_WIDTH, fontSize: "xs" }}>
      <Title order={2}>Anmälningar</Title>
      {gig ? <GigCard gig={gig} showDescription /> : <Loading msg='Laddar spelning...'  />}
      {loading && <Box sx={{ maxWidth: "fit-content" }}><Loading msg='Laddar anmälningar...' /></Box>}
      {!loading && <SignupList gigId={gigId} />}
    </Box>
  );

}

export default WhosComing;