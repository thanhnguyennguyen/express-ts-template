import { Get, Route, Controller, Query, Tags } from 'tsoa'

@Tags('Tag')
@Route('/example')
export default class ExampleController extends Controller {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  @Get('/ex1')
  public async getEx1(
    @Query() timestampFrom: number,
    @Query() timestampTo: number,
  ): Promise<any> {
    const result = {
      from: timestampFrom,
      to: timestampTo
    }
    return result
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  @Get('/ex2')
  public async getEx2(
    @Query() timestampFrom: number,
    @Query() timestampTo: number,
  ): Promise<any> {
    const result = {
      from: timestampFrom,
      to: timestampTo
    }
    return result
  }
}
