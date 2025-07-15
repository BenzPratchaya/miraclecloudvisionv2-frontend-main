export class OrderSortingOption {
    constructor(public value: string, public label: string) {}
  }
  
  export class OrderSortingHelper {
    static getOrderSortingOptions(): OrderSortingOption[] {
      return [
        { value: 'PA', label: 'Pending Ascending' },
        { value: 'PD', label: 'Pending Descending' },
        { value: 'SA', label: 'Submitted Ascending' },
        { value: 'SD', label: 'Submitted Descending' },
        { value: 'FA', label: 'Finalized Ascending' },
        { value: 'FD', label: 'Finalized Descending' },
      ].map(option => new OrderSortingOption(option.value, option.label));
    }

    static getOrderImagingStatusOptions(): OrderSortingOption[] {
      return [
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Pending', label: 'Pending' },
        { value: 'All', label: 'All' },
      ].map(option => new OrderSortingOption(option.value, option.label));
    }
    
    static getOrderRefferingStatusOptions(): OrderSortingOption[] {
      return [
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Summited', label: 'Summited' },        
        { value: 'All', label: 'All' },
      ].map(option => new OrderSortingOption(option.value, option.label));
    }
  }
  
  