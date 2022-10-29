import { Container, Label, SubContainer } from './StyleComponents'

function ProgressBar({remaining}) {

  return(
    <Container>
      <SubContainer completed={remaining}>
        <Label>{`${remaining}%`}</Label>
      </SubContainer>
    </Container>
  )
}

export default ProgressBar