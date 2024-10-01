import React, { FunctionComponent } from 'react'

export declare interface AppProps {
  FunctionComponent:FunctionComponent,
  children?: React.ReactNode; // best, accepts everything React can render
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onSubmit?: React.SyntheticEvent

}
