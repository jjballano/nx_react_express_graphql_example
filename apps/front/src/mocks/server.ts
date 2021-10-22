import { setupServer } from 'msw/node';
import { graphql } from 'msw';

// This configures a Service Worker with the given request handlers.
const server = setupServer();

beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

type HandlerMockConfiguration = {
  name: string;
  response: Record<string, unknown>;
};

export const mockServerHandler = ({
  name,
  response,
}: HandlerMockConfiguration) => {
  server.use(
    graphql.query(name, (req, res, ctx) => {
      return res(
        ctx.data(response)
      )
    })
  )
};