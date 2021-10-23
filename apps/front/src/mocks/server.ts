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
  getPayload?: (json: HandlerMockConfiguration['response']) => void;
};

export const mockServerHandler = ({
  name,
  response,
  getPayload,
}: HandlerMockConfiguration) => {
  server.use(
    graphql.query(name, ({body}, res, ctx) => {
      getPayload?.(typeof body === 'string' ? JSON.parse(body) : body);
      return res(
        ctx.data(response)
      )
    })
  )
};