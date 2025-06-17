export interface CloudinaryResource {
  assetId: string;
  publicId: string;
  assetFolder?: string;
  displayName?: string;
  format: string;
  version: number;
  resourceType: string;
  type: string;
  createdAt: string;
  bytes: number;
  width: number;
  height: number;
  tags: string[];
  metadata?: Record<string, any>;
  backup?: boolean;
  accessMode?: string;
  url: string;
  secureUrl: string;
}

export interface CloudinaryListResponse {
  resources: CloudinaryResource[];
  nextCursor?: string;
} 