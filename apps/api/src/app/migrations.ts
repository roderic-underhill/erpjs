import { CreateAnAddress1595508635328 } from './migrations/1595508635328-CreateAnAddress';
import { CreateUser1595508635324 } from './migrations/1595508635324-CreateUser';
import { CreateDB1595508635320 } from './migrations/1595508635320-CreateDB';
import { Language1595508635326 } from './migrations/1595508635326-Language';
import { InvoicesContent1609846660789 } from './migrations/1609846660789-InvoicesContent';
import { Menu1612978737166 } from './migrations/1612978737166-Menu';
import { MenuContent1612983991735 } from './migrations/1612983991735-MenuContent';
import { EnhanceCustomer1615749063579 } from './migrations/1615749063579-EnhanceCustomer';
import { MenuSettings1615961288134 } from './migrations/1615961288134-MenuSettings';
import { UoM1616228731111 } from './migrations/1616228731111-UoM';

export const migrations = [
  CreateDB1595508635320,
  CreateUser1595508635324,
  Language1595508635326,
  CreateAnAddress1595508635328,
  InvoicesContent1609846660789,
  Menu1612978737166,
  MenuContent1612983991735,
  EnhanceCustomer1615749063579,
  MenuSettings1615961288134,
  UoM1616228731111,
];
