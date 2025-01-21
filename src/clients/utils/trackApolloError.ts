import { print } from 'graphql';
import type { Operation } from '@apollo/client';
import type { GraphQLErrors } from '@apollo/client/errors';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

function extractOperationTransactionId(operation: Operation) {
  try {
    const ctx = operation.getContext();
    const headers = ctx.headers as Record<string, string>;

    return headers['x-transaction-id'];
  } catch (err) {
    return '';
  }
}

export function trackApolloError(operation: Operation, errors: GraphQLErrors, response?: unknown) {
  try {
    const errorMessage = `Gateway Operation Error [${operation.operationName}]`;
    const transactionId = extractOperationTransactionId(operation) || "";

    ExceptionProvider.captureException(
      new Error(errorMessage),
      "trackApolloError.ts",
      {
        operationName: operation?.operationName,
        variables: JSON.stringify(operation?.variables),
        query: print(operation?.query),
        response: JSON.stringify(response),
        errors: JSON.stringify(errors),
        transactionId,
      }
    );
  } catch (err) {
    ExceptionProvider.captureException(err, "trackApolloError.ts",)
  }
}
