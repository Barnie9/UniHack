import { useMutableState } from 'hooks';

interface Instance<T> {
	/**
	 * modal visibility
	 */
	visible: boolean;
	/**
	 * modal payload
	 */
	payload?: T;
	/**
	 * opens modal
	 */
	open(payload?: T): void;
	/**
	 * closes modal
	 */
	close(success?: boolean): void;
}

interface Props<T> {
	/**
	 * initial value for `instance.visible`
	 */
	visible?: boolean;
	/**
	 * initial value for `instance.payload`
	 */
	payload?: T;
	/**
	 * triggers before modal to open
	 */
	onOpen?(payload?: T): void;
	/**
	 * triggers before modal to close
	 */
	onClose?(success?: boolean): void;
}

/**
 * Encapsulates a generic modal state with the ability to easily control it
 *
 * @returns `Instance`
 *
 * @example
 *
 * const myModal = useModalState<{ id: string }>();
 *
 * myModal.open() // opens without the Id - `payload.id` = undefined
 * myModal.open({ id: 'my_id' }) // opens with the `id` under `payload` - `payload.id` = 'my_id'
 */
export function useModalState<T = never>({
	visible,
	payload,
	onOpen,
	onClose
}: Props<T> = {}): Instance<T> {
	const [state, setState] = useMutableState<{
		visible: boolean;
		payload?: T;
	}>({
		visible: visible ?? false,
		...(payload !== undefined && {
			payload
		})
	});

	return {
		// state
		visible: state.visible,
		payload: state.payload,
		// methods
		open(payload?: T) {
			onOpen?.(payload);
			setState(state => {
				state.visible = true;

				if (payload) state.payload = payload;
			});
		},
		close(success?: boolean) {
			onClose?.(success);
			setState({ visible: false });
		}
	};
}
