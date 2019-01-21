import { Ecosystem } from '../../ecosystem';
import { Client } from '../../user/client';

export class QuoteRequestRecipients {
  suppliers: Client[];
  ecosystems: Ecosystem[];
  avenews: boolean;
}
