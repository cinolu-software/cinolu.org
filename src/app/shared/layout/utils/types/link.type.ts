export interface ILink {
  name: string;
  external?: boolean;
  description?: string;
  fragment?: string;
  icon?: string;
  path: string;
  exactUrl?: boolean;
}
