import { Button, SegmentedButtonGroup, StackLayout } from "@salt-ds/core";
import { CallIcon, ChatGroupIcon, MessageIcon } from "@salt-ds/icons";
import type { ReactElement } from "react";

export const Variants = (): ReactElement => (
  <StackLayout>
    <SegmentedButtonGroup>
      <Button>
        <MessageIcon /> Message
      </Button>
      <Button>
        <ChatGroupIcon />
        Chat
      </Button>
      <Button>
        <CallIcon /> Call
      </Button>
    </SegmentedButtonGroup>
    <SegmentedButtonGroup>
      <Button variant="secondary">
        <MessageIcon /> Message
      </Button>
      <Button variant="secondary">
        <ChatGroupIcon /> Chat
      </Button>
      <Button variant="secondary">
        <CallIcon /> Call
      </Button>
    </SegmentedButtonGroup>
    <SegmentedButtonGroup>
      <Button variant="cta">
        <MessageIcon /> Message
      </Button>
      <Button variant="cta">
        <ChatGroupIcon /> Chat
      </Button>
      <Button variant="cta">
        <CallIcon /> Call
      </Button>
    </SegmentedButtonGroup>
  </StackLayout>
);
