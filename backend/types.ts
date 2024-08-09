export type Response = {
  statusCode: number;
  status: 'success' | 'failure';
  body: unknown;
  headers: Record<string, string>[];
};
