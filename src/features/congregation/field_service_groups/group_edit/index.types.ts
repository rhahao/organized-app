import { FieldServiceGroupType } from '@definition/field_service_groups';

export type GroupEditProps = {
  onClose: VoidFunction;
  onDelete: VoidFunction;
  group: FieldServiceGroupType;
  index: number;
};
