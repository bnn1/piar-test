import { HTMLInputTypeAttribute, useEffect, useState } from 'react';

import { EditableFields } from 'common/types/users';

export { useEditableFields };

type EditFields = {
  name: EditableFields;
  label: string;
  props?: { multiline?: boolean; type?: HTMLInputTypeAttribute };
};

const useEditableFields = (entity: 'user' | 'station') => {
  const [editableFields, setEditableFields] = useState<EditFields[]>([]);

  useEffect(() => {
    if (entity === 'user') {
      setEditableFields([
        { name: 'name', label: 'Имя' },
        { name: 'login', label: 'Логин' },
        { name: 'password', label: 'Пароль', props: { type: 'password' } },
        { name: 'comment', label: 'Комментарий', props: { multiline: true } },
      ]);
    }
    if (entity === 'station') {
      setEditableFields([
        { name: 'name', label: 'Имя' },
        { name: 'comment', label: 'Комментарий', props: { multiline: true } },
      ]);
    }
  }, [entity]);

  return editableFields;
};
