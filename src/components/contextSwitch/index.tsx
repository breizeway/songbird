import classNames from "classnames";
import { IIconProps, Icon } from "../svg/svg";
import styles from "./context-switch.module.css";

export interface IContextSwitchOption {
  id: string;
  label?: string;
  icon?: IIconProps;
}

interface IContextSwitchProps {
  name: string;
  options: IContextSwitchOption[];
  value: string | number;
  setValue: Function;
  className?: string;
}

export const ContextSwitch = ({
  name,
  options,
  value,
  setValue,
  className,
}: IContextSwitchProps): JSX.Element => {
  const onChange = (id: string) => {
    if (options.length === 2 && id === value) {
      const newValue = options.find((option) => option.id !== id)?.id ?? id;
      setValue(newValue);
    } else setValue(id);
  };

  return (
    <div className={classNames(styles.comp, className ?? "")}>
      {options.map(({ id, label, icon }: IContextSwitchOption) => {
        return (
          <label
            htmlFor={id}
            key={id}
            className={classNames(styles.context, {
              [styles.contextChecked]: value === id,
            })}
          >
            <input
              type="radio"
              className={styles.radio}
              checked={value === id}
              onClick={() => onChange(id)}
              {...{ id, name }}
            />
            {!!icon ? <Icon {...icon} /> : label ?? ""}
          </label>
        );
      })}
    </div>
  );
};
