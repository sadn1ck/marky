import { shallowEqual } from '@xstate/react'
import { bootstrapControllerContext } from '../state/bootstrap'

export const useBootstrapChildren = () => {
  const [filesController, layoutController] = bootstrapControllerContext.useSelector(
    (s) => [s.children.filesController, s.children.layoutController],
    shallowEqual
  )

  return {
    filesController,
    layoutController
  }
}
