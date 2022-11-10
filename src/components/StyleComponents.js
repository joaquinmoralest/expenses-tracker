import styled from 'styled-components'

export const Container = styled.div `
  height: 20px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: .5rem;
  border-radius: 25px;
  background-color: #f2f2f2;
`

export const SubContainer = styled(Container) `
  width: ${props => props.completed}%;
  background-color: green;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: .8s ease-in-out; 
`

export const Label = styled.span `
  font-size: 12px;
  color: #f7f7f7;
  margin-right: 5px;
`
