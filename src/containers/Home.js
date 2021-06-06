import React from 'react'
import DoingNow from '../components/DoingNow'
import Timeline from '../components/Timeline'
import {
  Container
}from '@material-ui/core'

export default function Home() {
  return (
    <Container maxWidth="lg" >
      <DoingNow/>
      <Timeline/>
    </Container>
  )
}