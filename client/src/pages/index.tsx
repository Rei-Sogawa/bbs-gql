import { VFC } from "react";

import { AppContainer } from "../components/AppContainer";
import { AppHeader } from "../components/AppHeader";
import { AppLayout } from "../components/AppLayout";

export const Index: VFC = () => {
  return (
    <AppLayout>
      <AppContainer size="lg">
        <div className="text-center">
          <AppHeader>Index Page!</AppHeader>
        </div>
      </AppContainer>
    </AppLayout>
  );
};
